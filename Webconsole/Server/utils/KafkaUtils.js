const { Kafka } = require('kafkajs')
const { v4 } = require('uuid');

const kafka = new Kafka({
    clientId: 'webconsole-'.concat(v4()),
    brokers: ['localhost:9092']
})

const producer = kafka.producer()

/* kafka.consumer({
groupId: <String>,
partitionAssigners: <Array>,
sessionTimeout: <Number>,
rebalanceTimeout: <Number>,
heartbeatInterval: <Number>,
metadataMaxAge: <Number>,
allowAutoTopicCreation: <Boolean>,
maxBytesPerPartition: <Number>,
minBytes: <Number>,
maxBytes: <Number>,
maxWaitTimeInMs: <Number>,
retry: <Object>,
maxInFlightRequests: <Number>,
rackId: <String>
}) */


const consumer = kafka.consumer({
    groupId: 'webconsole-group-'.concat(v4()),
    allowAutoTopicCreation: true,
    retry: {
        initialRetryTime: 100,
        retries: 8
    }
})
const topic = "UserSearchEngineTopic"


exports.sendKafkaMessage = async function (kafkaTopic, kafkaMessage) {
    console.log(kafkaMessage)
    await producer.connect()
    resp = await producer.send({
        topic: kafkaTopic,
        messages: Array(kafkaMessage)
    })
    console.log("logging kafkaMessage response")
    console.log(resp);
    await producer.disconnect()
    return resp;

}

exports.consumeKafkaMessage = async function (kafkaTopic, callback) {
    // let messages = new Array();
    await consumer.connect()
    await consumer.subscribe({ topic: kafkaTopic, fromBeginning: false })
    await consumer.run(
        {
            autoCommitInterval: 1000,
            autoCommitThreshold: 30,
            eachMessage: async ({ topic, partition, message }) => callback(topic,partition, message)
            
            // {
            //     messages = [];
            //     const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
            //     console.log(`- ${prefix} ${message.key}#${message.value}`)
            //     messages.push(message.value)
            // },
        }
    )

    //  consumer.disconnect()
}

// this.sendKafkaMessage(topic, { value: JSON.stringify({ msg: "Testing message", id: v4() }), key: v4() })
// this.consumeKafkaMessage(topic)

//   const run = async () => {
//     // Producing
//     await producer.connect()
//     await producer.send({
//       topic: 'test-topic',
//       messages: [
//         { value: 'Hello KafkaJS user!' },
//       ],
//     })

    // Consuming


    // await consumer.run({
    //   eachMessage: async ({ topic, partition, message }) => {
    //     console.log({
    //       partition,
    //       offset: message.offset,
    //       value: message.value.toString(),
    //     })
    //   },
    // })
//   }

//   run().catch(console.error)