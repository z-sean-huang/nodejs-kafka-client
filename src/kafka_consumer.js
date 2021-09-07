const {parentPort} = require("worker_threads");
const {Kafka} = require('kafkajs')
const {KF_CLIENTID, KF_BROKERS, KF_TOPIC, KF_CONSUMER_GROUP} = require('./kafka_conf')
 
const kafka = new Kafka({clientId: KF_CLIENTID, brokers: KF_BROKERS})
const consumer = kafka.consumer({groupId: KF_CONSUMER_GROUP})

const run = async () => {
    console.log("Kafka consumer connect to broker")
    await consumer.connect()
    await consumer.subscribe({ topic: KF_TOPIC, fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            parentPort.postMessage({topic, partition, offset: message.offset, msg: message.value.toString()});
        }
    })
}

run().catch(e => console.error(`consumer error with ${e.message}`, e))