const socket = io()
const $btnSendProducerMsg = document.querySelector("#btn_send_producer_msg")
const $buttonPerfTest = document.querySelector("#btn_perf_test")

socket.on("s2c_kf_consumer_recv_msg", (message) => {
    console.log("receive server message:", message)

    const $kfConsumerLog = document.querySelector("#kf_consumer_log")
    $kfConsumerLog.value += JSON.stringify(message) +"\n";
    $kfConsumerLog.scrollTop = $kfConsumerLog.scrollHeight; // auto scroll to the bottom
})

socket.on("s2c_kf_topic_log_appended", ({path, content}) => {
    console.log("kafka topic log has been appended", {path, content})

    document.querySelector("#kf_topic_log_path").innerHTML = "Kafka Topic Log: " + path
    const $kfTopicLog = document.querySelector("#kf_topic_log")
    $kfTopicLog.value += content
    $kfTopicLog.scrollTop = $kfTopicLog.scrollHeight; // auto scroll to the bottom
})

socket.on("s2c_kf_broker_log_appended", ({path, content}) => {
    console.log("kafka broker log has been appended", {path, content})

    document.querySelector("#kf_broker_log_path").innerHTML = "Kafka Broker Log: " + path
    const $kfBrokerLog = document.querySelector("#kf_broker_log")
    let bAutoScroll = false
    if ($kfBrokerLog.scrollHeight - $kfBrokerLog.scrollTop === $kfBrokerLog.clientHeight) { bAutoScroll = true }
    $kfBrokerLog.value += content
    if (bAutoScroll) { $kfBrokerLog.scrollTop = $kfBrokerLog.scrollHeight } // auto scroll to the bottom }
})

socket.on("s2c_kf_perf_test_result", ({stdout})  => {
    console.log("s2c_kf_perf_test_result", {stdout})

    const $kfPerfTestResult = document.querySelector("#kf_perf_test_result")
    $kfPerfTestResult.value += stdout
    $kfPerfTestResult.scrollTop = $kfPerfTestResult.scrollHeight; // auto scroll to the bottom
})

$btnSendProducerMsg.addEventListener("click", (e) => {
    const msg = document.querySelector("#kf_producer_msg").value
    socket.emit("c2s_kf_producer_send_msg", msg)
})

$buttonPerfTest.addEventListener("click", (e) => {
    socket.emit("c2s_perf_test")
})