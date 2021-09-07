# nodejs-kafka-client
#### Apache Kafka broker/producer/consumer monitor based on node.js backend and Kafka client on Linux (Ubuntu) platform

#### Software stacks: Socket.io/Node.js, Apache Kafka, Bootstrap

Demo: TODO

Source: https://github.com/z-sean-huang/nodejs-kafka-client

![nodejs-kafka-client screenshot](http://github.com/z-sean-huang/nodejs-kafka-client/blob/main/screenshots/nodejs_kafka_client_01.JPG?raw=true)

#### Steps to setup the service:
```
// Download the source code to your local
$>git clone https://github.com/z-sean-huang/nodejs-kafka-client.git

// Launch both Kafka zookeeper and broker at localhost, or remote but with modified src/kafka_conf.js
$> KAFKA_DIR/bin/zookeeper-server-start.sh config/zookeeper.properties 
$> KAFKA_DIR/bin/kafka-server-start.sh config/server.properties

// Install the dependent npm packages
$>cd nodejs-kafka-client
$>npm install

// Run the Socket.io/node.js service
$>npm run dev

// Visit the localhost via the browser to send/test with message, enjoy!

```
