

name := "SparkJobs"

version := "0.1"


scalaVersion := "2.12.12"
//addSbtPlugin("com.eed3si9n" % "sbt-assembly" % "0.15.0")
//addSbtPlugin("com.eed3si9n" % "sbt-assembly" % "0.14.2")
//addSbtPlugin("com.eed3si9n" % "sbt-assembly" % "0.14.5")
libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % "2.4.6",
  "org.apache.spark" %% "spark-sql" % "2.4.6"
)
