//package kafka
//
//import java.util.Properties
//
//import com.google.gson.GsonBuilder
//import jsonclass.OutputCsv
//import org.apache.kafka.clients.consumer.ConsumerConfig
//import org.apache.kafka.clients.producer.{KafkaProducer, ProducerConfig, ProducerRecord}
//
//object KafkaUtils {
//
//  val gson = new GsonBuilder()
//    .setDateFormat("yyyyMMdd HH:mm:ss")
//    .setPrettyPrinting()
//    .create();
//
//  val kafkaBrokers = "localhost:9092"
//
//  def getProperties(): Properties = {
//    val props = new Properties()
//    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBrokers);
//    props.put(ProducerConfig.CLIENT_ID_CONFIG, "Scala Kafaka Utils")
//    props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer")
//    props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer")
//    return props;
//  }
//
//  var producer = new KafkaProducer[String, String](getProperties());
//
//  def messageProducer(topic: String, key: String, outputCsv: OutputCsv) = {
//    if (producer == null) {
//      producer = new KafkaProducer[String, String](getProperties());
//    }
//    val data = new ProducerRecord[String, String](topic, key, gson.toJson(outputCsv));
//    producer.send(data);
//  }
//
//  def closeProducer = {
//    producer.close()
//  };
//
//  def createConsumerConfig(groupId: String): Properties = {
//    val props = new Properties()
//    props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBrokers)
//    props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId)
//    props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, "true")
//    props.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, "1000")
//    props.put(ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG, "30000")
//    props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer")
//    props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer")
//    props
//  }
//
//  def messageConsumer(topic: String): Unit ={
//
//  }
//
//}
