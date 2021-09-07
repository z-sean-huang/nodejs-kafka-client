const path = require("path")
const http = require("http")
const express = require("express")
const socketio = require("socket.io")
const fs = require('fs');

const {kfProducerSendMsg, kfProducerPerfTest} = require("./kafka_producer");
const {kfTopicLogTracer, kfBrokerLogTracer} = require("./kafka_log.js");
const {Worker} = require("worker_threads")
const kfConsumer = new Worker("./src/kafka_consumer.js");

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirPath = path.join(__dirname, "../public")
app.use(express.static(publicDirPath))

io.on("connection", (socket) => {
    console.log("new WebSocket connection from client")

    socket.on("c2s_kf_producer_send_msg", (msg) => {
        console.log(`kafka producer sends message:[value=${msg}]`)
        kfProducerSendMsg(msg)
    })

    socket.on("c2s_perf_test", async () => {
        const {stdout} = await kfProducerPerfTest()
        console.log("kafka perf test result:", {stdout})
        io.emit("s2c_kf_perf_test_result", {stdout})
    })

    socket.on("disconnect", () => {
        console.log("client disconnected")
    })
})

const kfConsumerRecvMsg = () => {
    kfConsumer.on("message", ({topic, partition, offset, msg}) => {
        console.log(`kafka consumer received message:[topic=${topic} partition=${partition} offset=${offset} value=${msg}]`)
        io.emit("s2c_kf_consumer_recv_msg", {topic, partition, offset, msg})
    });
    
    kfConsumer.on("error", err => {
        console.log(err);
    });
}

kfConsumerRecvMsg()

kfTopicLogTracer(({path, content}) => {
    console.log("kafka topic log has been appended", {path, content})
    io.emit("s2c_kf_topic_log_appended", {path, content})
})

kfBrokerLogTracer(({path, content}) => {
    console.log("kafka broker log has been appended", {path, content})
    io.emit("s2c_kf_broker_log_appended", {path, content})
})

const port = process.env.PORT || 80
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})