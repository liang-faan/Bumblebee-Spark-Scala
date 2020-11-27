//import Recommender.{createSparkSession, readCsvFile, testDataGenerator}
//import org.apache.spark.sql.{Encoders, SparkSession}
//import org.slf4j.LoggerFactory
//
//object RecommenderJob extends App {
//
//  val inputFile = args(0);
//  val recommendColumn = args(1);
//
//  println("input file %s", inputFile)
//  println("input recommend colomns %s", recommendColumn)
//
//  val logger = LoggerFactory.getLogger(RecommenderJob.getClass);
//
//  println(Seq.fill(100){(testDataGenerator(100),testDataGenerator(5),testDataGenerator(100000) )});
//
//
//  val session : SparkSession = createSparkSession("local[*]");
//
//  val dataFrame = readCsvFile(session, inputFile)
//
//  dataFrame.show(20)
//  dataFrame.printSchema();
//
//
//
//}
