name := "SparkRecommendation"

version := "0.1"

scalaVersion := "2.12.12"


libraryDependencies ++= Seq(

  "org.slf4j" % "slf4j-api" % "1.7.30",
  //  "org.slf4j" % "slf4j-simple" % "1.7.30" % Test,
  //  "com.google.code.gson" % "gson" % "2.8.6"
  "com.google.code.gson" % "gson" % "2.8.6",
  "org.apache.kafka" % "kafka-clients" % "2.6.0",
  "org.apache.spark" %% "spark-core" % "3.0.1",
  "org.apache.spark" %% "spark-sql" % "3.0.1",
  "org.apache.spark" %% "spark-mllib" % "3.0.1",
  "org.apache.kafka" %% "kafka" % "2.6.0"
)