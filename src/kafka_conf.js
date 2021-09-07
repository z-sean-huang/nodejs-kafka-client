const KF_CLIENTID = 'kf_client'
const KF_BROKERS = ['localhost:9092']
const KF_TOPIC = 'kf_topic'
const KF_CONSUMER_GROUP = 'kf_consumer_group'
const KF_PATH = "/home/sean/kafka/kafka_2.13-2.8.0"

// Please make sure (1) zookeeper and (2) broker are up at localhost before running this app
// (1) KF_PATH$> bin/zookeeper-server-start.sh config/zookeeper.properties 
// (2) KF_PATH$> bin/kafka-server-start.sh config/server.properties

module.exports = {KF_CLIENTID, KF_BROKERS, KF_TOPIC, KF_CONSUMER_GROUP, KF_PATH}