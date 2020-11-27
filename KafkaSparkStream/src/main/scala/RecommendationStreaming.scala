
import java.util.{Properties, UUID}

import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.clients.producer.{KafkaProducer, ProducerConfig, ProducerRecord}
import org.apache.spark.SparkConf
import org.apache.spark.mllib.recommendation.MatrixFactorizationModel
import org.apache.spark.streaming.kafka010.ConsumerStrategies.Subscribe
import org.apache.spark.streaming.kafka010.KafkaUtils
import org.apache.spark.streaming.kafka010.LocationStrategies.PreferConsistent
import org.apache.spark.streaming.{Seconds, StreamingContext}
import org.slf4j.LoggerFactory

import scala.collection.mutable.ListBuffer

case class User(userId: String)
case class UserRecommandation(userId: String, recommandations: Array[String])

object RecommendationStreaming {

  private val logger = LoggerFactory.getLogger("RecommendationStreaming")

  private val gson = new GsonBuilder()
    .setDateFormat("yyyyMMdd HH:mm:ss")
    .setPrettyPrinting()
    .create();
  val kafkaBrokers = "localhost:9092"
  private val groupId = UUID.randomUUID().toString

  def createConsumerConfig: Map[String, Object] = Map[String, Object](
    ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG -> kafkaBrokers,
    ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG -> "true",
    ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG -> "1000",
    ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG -> "30000",
    ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG -> "org.apache.kafka.common.serialization.StringDeserializer",
    ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG -> "org.apache.kafka.common.serialization.StringDeserializer",
    ConsumerConfig.GROUP_ID_CONFIG -> groupId,
    ConsumerConfig.AUTO_OFFSET_RESET_CONFIG -> "latest"
  )

  def getProperties: Properties = {
    val props = new Properties()
    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBrokers);
    props.put(ProducerConfig.CLIENT_ID_CONFIG, ("RecommendationStreaming" + UUID.randomUUID().toString))
    props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer")
    props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer")
    return props;
  }


  def main(args: Array[String]): Unit = {
    //    val spark = SparkSession.builder().appName("NetworkWordCount").master("local[*]").getOrCreate();

    val conf = new SparkConf().setMaster("local[4]").setAppName("User Searching Recommendation");
    val ssc = new StreamingContext(conf, Seconds(4));
    ssc.sparkContext.setLogLevel("ERROR")
    /**
     * Loading Recommendation Model
     */
    val recommendModel = MatrixFactorizationModel.load(ssc.sparkContext, "./RecommendationModel")

    /**
     * Create direct String to consume kafka message
     */
    val stream = KafkaUtils.createDirectStream[String, String](
      ssc,
      PreferConsistent,
      Subscribe[String, String](Array("user_info"), createConsumerConfig)
    )

    /**
     * Create Kafka producer
     * use to write recommendation back to kafka
     */

    val producer = new KafkaProducer[String, String](getProperties);

    /**
     * Loaded Magazine dump base.
     * in production it should connect to database.
     */
    val magazineStreams = ssc.sparkContext.textFile("./Data/magazine_source.csv").map(
      (line) => line.split(",")
    )

    logger.info("Total Magazine {}", magazineStreams.count())
    //    val magazineList : List[String] = List[String]();
    var magazineList = new ListBuffer[String]()
    magazineStreams.collect().foreach(
      f => {
        if (f.length > 3)
          magazineList += f.apply(3)
      }
    )

    logger.info("magazine list {}", magazineList.size)


    //input the user id
    /**
     * Listening kafka and proceed recommendation.
     */
    val records = stream.map(record =>
      (record.key, record.value)
    )
    records.print(10)

    records.foreachRDD(
      (messageRdd, time) => {
        var recommendationList = new ListBuffer[String]();
        if (!messageRdd.isEmpty() && messageRdd.first()._2.contains("userId")) {
          logger.debug(messageRdd.first()._2) //getting message body
          val tyze = new TypeToken[User]() {}.getType
          val user: User = gson.fromJson(messageRdd.first()._2, tyze);
          logger.info(user.userId)
          logger.debug(time.toString())
          val recommendations = recommendModel.recommendProducts(user.userId.toInt, 10);
          recommendations.foreach(rate => {
            logger.info("Recommendation Product: {}", rate.product)
            logger.info("Recommended Magazine {}", magazineList.apply((rate.product % magazineList.size + 1)))

            recommendationList.append(magazineList.apply((rate.product % magazineList.size + 1)).replaceFirst("^\"",""))
          }
          )
          recommendationList = recommendationList.distinct;
          logger.info("recommendationList size {}", recommendationList.size)
          recommendationList.foreach(s => {
            logger.info("Output List {}", s)
          })

          val userRecommandation = new UserRecommandation(user.userId, recommendationList.toList.toArray)
          logger.info("after Object {}", userRecommandation.recommandations.length)

          producer.send(new ProducerRecord[String, String](
            "user_recommendation",
            UUID.randomUUID().toString,
            gson.toJson(userRecommandation, classOf[UserRecommandation])
          ))
        }
      }
    )
    //recommend 100 products to a user


    ssc.start();
    ssc.awaitTermination();
  }

}
