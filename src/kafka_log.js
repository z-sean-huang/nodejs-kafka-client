const fs = require('fs');
const { exec } = require("child_process");
const {KF_CLIENTID, KF_BROKERS, KF_TOPIC, KF_CONSUMER_GROUP, KF_PATH} = require('./kafka_conf')

const KF_TOPIC_LOG_PATH = `/tmp/kafka-logs/${KF_TOPIC}-0/00000000000000000000.log`
const KF_BROKERS_LOG_PATH = `${KF_PATH}/logs/server.log`

const kfTopicLogTracer = (cb) => {
    fs.watchFile(KF_TOPIC_LOG_PATH, (curr, prev) => {
        console.log(`${KF_TOPIC_LOG_PATH}: prev.size=${prev.size}, curr.size=${curr.size}`);

        // just read out the new/appended size in kafka log.
        exec(`tail -c ${curr.size-prev.size} ${KF_TOPIC_LOG_PATH}`,  (error, stdout, stderr) => {
            cb({path: KF_TOPIC_LOG_PATH, content: stdout})
        })
    });
}

const kfBrokerLogTracer = (cb) => {
    fs.watchFile(KF_BROKERS_LOG_PATH, (curr, prev) => {
        console.log(`${KF_BROKERS_LOG_PATH}: prev.size=${prev.size}, curr.size=${curr.size}`);

        exec(`tail -c ${curr.size-prev.size} ${KF_BROKERS_LOG_PATH}`,  (error, stdout, stderr) => {
            cb({path: KF_BROKERS_LOG_PATH, content: stdout})
        })
    });
}

module.exports = {kfTopicLogTracer, kfBrokerLogTracer}