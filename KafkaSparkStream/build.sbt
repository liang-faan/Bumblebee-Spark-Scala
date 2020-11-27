name := "KafkaSparkStream"

version := "0.1"

scalaVersion := "2.12.12"


libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % "3.0.1" % Provided,
  "org.apache.spark" %% "spark-sql" % "3.0.1",
  "org.slf4j" % "slf4j-api" % "1.7.30",
  //  "org.slf4j" % "slf4j-simple" % "1.7.30" % Test,
  "org.apache.spark" %% "spark-mllib" % "3.0.1",
  "com.google.code.gson" % "gson" % "2.8.6",
  "org.apache.kafka" % "kafka-clients" % "2.6.0",
  "org.apache.kafka" %% "kafka-streams-scala" % "2.6.0",
  "org.apache.spark" %% "spark-streaming-kafka-0-10" % "3.0.1",
  "org.apache.kafka" %% "kafka" % "2.6.0",
  "com.lihaoyi" %% "requests" % "0.6.5"
)
