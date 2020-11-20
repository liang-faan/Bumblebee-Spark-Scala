import org.apache.spark.sql
import org.apache.spark.sql.SparkSession
import org.slf4j.LoggerFactory

object Recommender {

  val logger = LoggerFactory.getLogger(Recommender.getClass);

  def loadFile(filePath: String) : Unit ={

    return null;
  }

  def createSparkSession(host: String) : SparkSession = {
    val session = SparkSession.builder().appName("CSV to json conversion").master(host).getOrCreate()
    return session;
  }

  def testDataGenerator(count:Int): Int ={
    return scala.util.Random.nextInt(count)+1;
  }


  def readCsvFile(session: SparkSession, input: String): sql.DataFrame = {
    val df = session.read.format("com.databricks.spark.csv")
      .options(Map("inferSchema" -> "true", "delimiter" -> ",", "header" -> "true", "multiline" -> "true"))
      .csv(input)
    logger.info("DataFrame schema...")
    df.printSchema();
    logger.info("DataFrame size {}", df.count());
    return df
  }

}
