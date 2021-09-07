const {Kafka} = require('kafkajs')
const {KF_CLIENTID, KF_BROKERS, KF_TOPIC, KF_CONSUMER_GROUP, KF_PATH} = require('./kafka_conf')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
 
const kafka = new Kafka({ clientId: KF_CLIENTID, brokers: KF_BROKERS })
const producer = kafka.producer()

console.log("Kafka producer connect to broker")
producer.connect()

const kfProducerSendMsg = async (msg) => {
    await producer.send({
      topic: KF_TOPIC,
      messages: [ { value: msg } ],
    })
}

const kfProducerPerfTest = async (msgSize=10, msgNum=10) => {
    const cmd = `${KF_PATH}/bin/kafka-producer-perf-test.sh --topic ${KF_TOPIC} --num-records ${msgSize} --throughput 10 --record-size ${msgNum} --producer-props bootstrap.servers=${KF_BROKERS.join(",")}`
    const {stdout, stderr} = await exec(cmd)
    return {stdout: stdout}
}
 
 module.exports = { kfProducerSendMsg, kfProducerPerfTest }