package kafka

import java.util.concurrent.{ExecutorService, Executors}
import java.util.{Collections, Properties}

import com.google.gson.GsonBuilder
import org.apache.kafka.clients.consumer.{ConsumerConfig, KafkaConsumer}
import org.apache.kafka.clients.producer.{KafkaProducer, ProducerConfig, ProducerRecord}

object KafkaUtils {

  val gson = new GsonBuilder()
    .setDateFormat("yyyyMMdd HH:mm:ss")
    .setPrettyPrinting()
    .create();

  val kafkaBrokers = "localhost:9092"
  val groupId = "group1"

  def getProperties(): Properties = {
    val props = new Properties()
    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBrokers);
    props.put(ProducerConfig.CLIENT_ID_CONFIG, "Scala Kafaka Utils")
    props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer")
    props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer")
    return props;
  }

  var producer = new KafkaProducer[String, String](getProperties());

  def messageProducer(topic: String, key: String, message:String) = {
    if (producer == null) {
      producer = new KafkaProducer[String, String](getProperties());
    }
    val data = new ProducerRecord[String, String](topic, key, message);
    producer.send(data);
  }

  def closeProducer = {
    producer.close()
  };

  def createConsumerConfig(groupId: String): Properties = {
    val props = new Properties()
    props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBrokers)
    props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId)
    props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, "true")
    props.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, "1000")
    props.put(ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG, "30000")
    props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer")
    props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer")
    props
  }

  val props = createConsumerConfig(groupId)
  val consumer = new KafkaConsumer[String, String](props)
  var executor: ExecutorService = null

  def messageConsumer(topic: String, groupId: String): Unit ={
    consumer.subscribe(Collections.singletonList(topic))
    Executors.newSingleThreadExecutor.execute(    new Runnable {
      override def run(): Unit = {
        while (true) {
          val records = consumer.poll(1000)
          for (record <- records) {
            System.out.println("Received message: (" + record.key() + ", " + record.value() + ") at offset " + record.offset())
          }
        }
      }
    })
  }

  def shutdown() = {
    if (consumer != null)
      consumer.close();
    if (executor != null)
      executor.shutdown();
  }

}
