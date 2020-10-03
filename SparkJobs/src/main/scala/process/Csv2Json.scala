package process

import java.io.{FileOutputStream, ObjectOutputStream, PrintWriter}

import org.apache.spark.sql
import org.apache.spark.sql.functions.{col, collect_list, concat_ws, last, monotonically_increasing_id, regexp_extract, trim}
import org.apache.spark.sql.{DataFrame, Row, SparkSession}
import org.apache.spark.sql.expressions.Window

import scala.collection.mutable.ListBuffer
import scala.util.parsing.json.JSONObject

object Csv2Json {

  def main(args: Array[String]): Unit = {

    val input = args(0)
    val output = args(1)

    val session = connectToSpark()
    val df = readingCSVfile(session, input)
    //    /**
    //     * Remove null string from raw files
    //     */
    //    val nonNullDf = df.na.fill("");
    /*
    * Based nonNullDf to print Json
    * */
    val outputDf = processCSVFile(df)
    transformCSVJson(outputDf, output)

  }

  def connectToSpark(): SparkSession = {
    val session = SparkSession.builder().appName("CSV to json conversion")
      .master("local").getOrCreate()
    return session
  }

  def readingCSVfile(session: SparkSession, input: String): sql.DataFrame = {
    val df = session
      .read
      .format("com.databricks.spark.csv")
      .options(Map("inferSchema" -> "false", "delimiter" -> ",", "header" -> "true", "multiline" -> "true"))
      .schema("accession_no_csv string, Image string, object_work_type string, title_text string, preference string, " +
        "title_language string, creator_2 string, creator_1 string, creator_role string, creation_date string, " +
        "creation_place_original_location string, styles_periods_indexing_terms string, inscriptions string, " +
        "inscription_language string, scale_type string, shape string, materials_name string, techniques_name string, " +
        "object_colour string, edition_description string, physical_appearance string, subject_terms_1 string, " +
        "subject_terms_2 string, subject_terms_3 string, subject_terms_4 string, context_1 string, context_2 string, context_3 string, " +
        "context_4 string, context_5 string, context_6 string, context_7 string, context_8 string, context_9 string, context_10 string, " +
        "context_11 string, context_12 string, context_13 string, context_14 string, context_15 string, context_16 string, " +
        "context_17 string, context_18 string, context_19 string, context_20 string, context_21 string, context_22 string, " +
        "context_23 string, context_24 string, sgcool_label_text string")
      //      .csv("inputfile/Consolidated_R2_20190327.csv")
      .csv(input)
    return df
  }

  def processCSVFile(df: sql.DataFrame): DataFrame = {
    /**
     * Remove null string from raw files
     */
    //    val nonNullDf = df.na.fill("");
    /**
     * fill with last good observation
     */
    val dataWithIndex = df.withColumn("idx", monotonically_increasing_id());
    val partitionWindow = Window.orderBy("idx")
    val Df2 = dataWithIndex.withColumn("accession_no_csv", last("accession_no_csv", true) over (partitionWindow))

    val F201700091DfMerged = Df2.filter(col("accession_no_csv").isNotNull).groupBy("accession_no_csv")
      .agg(collect_list("Image").as("Image")
        , collect_list("object_work_type").as("object_work_type")
        , collect_list("title_text").as("title_text")
        , collect_list("preference").as("preference")
        , collect_list("title_language").as("title_language")
        , collect_list("creator_2").as("creator_2")
        , collect_list("creator_1").as("creator_1")
        , collect_list("creator_role").as("creator_role")
        , collect_list("creation_date").as("creation_date")
        , collect_list("creation_place_original_location").as("creation_place_original_location")
        , collect_list("styles_periods_indexing_terms").as("styles_periods_indexing_terms")
        , collect_list("inscriptions").as("inscriptions")
        , collect_list("inscription_language").as("inscription_language")
        , collect_list("scale_type").as("scale_type")
        , collect_list("shape").as("shape")
        , collect_list("materials_name").as("materials_name")
        , collect_list("techniques_name").as("techniques_name")
        , collect_list("object_colour").as("object_colour")
        , collect_list("edition_description").as("edition_description")
        , collect_list("physical_appearance").as("physical_appearance")
        , collect_list("subject_terms_1").as("subject_terms_1")
        , collect_list("subject_terms_2").as("subject_terms_2")
        , collect_list("subject_terms_3").as("subject_terms_3")
        , collect_list("subject_terms_4").as("subject_terms_4")
        , collect_list("context_1").as("context_1")
        , collect_list("context_2").as("context_2")
        , collect_list("context_3").as("context_3")
        , collect_list("context_4").as("context_4")
        , collect_list("context_5").as("context_5")
        , collect_list("context_6").as("context_6")
        , collect_list("context_7").as("context_7")
        , collect_list("context_8").as("context_8")
        , collect_list("context_9").as("context_9")
        , collect_list("context_10").as("context_10")
        , collect_list("context_11").as("context_11")
        , collect_list("context_12").as("context_12")
        , collect_list("context_13").as("context_13")
        , collect_list("context_14").as("context_14")
        , collect_list("context_15").as("context_15")
        , collect_list("context_16").as("context_16")
        , collect_list("context_17").as("context_17")
        , collect_list("context_18").as("context_18")
        , collect_list("context_19").as("context_19")
        , collect_list("context_20").as("context_20")
        , collect_list("context_21").as("context_21")
        , collect_list("context_22").as("context_22")
        , collect_list("context_23").as("context_23")
        , collect_list("context_24").as("context_24")
        , collect_list("sgcool_label_text").as("sgcool_label_text"))
      .toDF();

    val output = F201700091DfMerged.select(
      trim(col("accession_no_csv")).as("accession_no_csv"),
      trim(concat_ws(" ", col("Image"))).as("Image")
      , trim(concat_ws(" ", col("object_work_type"))).as("object_work_type")
      , trim(concat_ws(" ", col("title_text"))).as("title_text")
      , trim(concat_ws(" ", col("preference"))).as("preference")
      , trim(concat_ws(" ", col("title_language"))).as("title_language")
      , trim(concat_ws(" ", col("creator_2"))).as("creator_2")
      , trim(concat_ws(" ", col("creator_1"))).as("creator_1")
      , trim(concat_ws(" ", col("creator_role"))).as("creator_role")
      , trim(concat_ws(" ", col("creation_date"))).as("creation_date")
      , trim(concat_ws(" ", col("creation_place_original_location"))).as("creation_place_original_location")
      , trim(concat_ws(" ", col("styles_periods_indexing_terms"))).as("styles_periods_indexing_terms")
      , trim(concat_ws(" ", col("inscriptions"))).as("inscriptions")
      , trim(concat_ws(" ", col("inscription_language"))).as("inscription_language")
      , trim(concat_ws(" ", col("scale_type"))).as("scale_type")
      , trim(concat_ws(" ", col("shape"))).as("shape")
      , trim(concat_ws(" ", col("materials_name"))).as("materials_name")
      , trim(concat_ws(" ", col("techniques_name"))).as("techniques_name")
      , trim(concat_ws(" ", col("object_colour"))).as("object_colour")
      , trim(concat_ws(" ", col("edition_description"))).as("edition_description")
      , trim(concat_ws(" ", col("physical_appearance"))).as("physical_appearance")
      , trim(concat_ws(" ", col("subject_terms_1"))).as("subject_terms_1")
      , trim(concat_ws(" ", col("subject_terms_2"))).as("subject_terms_2")
      , trim(concat_ws(" ", col("subject_terms_3"))).as("subject_terms_3")
      , trim(concat_ws(" ", col("subject_terms_4"))).as("subject_terms_4")
      , trim(concat_ws(" ", col("context_1"))).as("context_1")
      , trim(concat_ws(" ", col("context_2"))).as("context_2")
      , trim(concat_ws(" ", col("context_3"))).as("context_3")
      , trim(concat_ws(" ", col("context_4"))).as("context_4")
      , trim(concat_ws(" ", col("context_5"))).as("context_5")
      , trim(concat_ws(" ", col("context_6"))).as("context_6")
      , trim(concat_ws(" ", col("context_7"))).as("context_7")
      , trim(concat_ws(" ", col("context_8"))).as("context_8")
      , trim(concat_ws(" ", col("context_9"))).as("context_9")
      , trim(concat_ws(" ", col("context_10"))).as("context_10")
      , trim(concat_ws(" ", col("context_11"))).as("context_11")
      , trim(concat_ws(" ", col("context_12"))).as("context_12")
      , trim(concat_ws(" ", col("context_13"))).as("context_13")
      , trim(concat_ws(" ", col("context_14"))).as("context_14")
      , trim(concat_ws(" ", col("context_15"))).as("context_15")
      , trim(concat_ws(" ", col("context_16"))).as("context_16")
      , trim(concat_ws(" ", col("context_17"))).as("context_17")
      , trim(concat_ws(" ", col("context_18"))).as("context_18")
      , trim(concat_ws(" ", col("context_19"))).as("context_19")
      , trim(concat_ws(" ", col("context_20"))).as("context_20")
      , trim(concat_ws(" ", col("context_21"))).as("context_21")
      , trim(concat_ws(" ", col("context_22"))).as("context_22")
      , trim(concat_ws(" ", col("context_23"))).as("context_23")
      , trim(concat_ws(" ", col("context_24"))).as("context_24")
      , trim(concat_ws(" ", col("sgcool_label_text"))).as("sgcool_label_text")
    ).toDF();
    output.show()
    //    F201700091DfMerged.show(40);
    //    df.filter($"value" === 1);
    //    var dfNulls=df.filter($"")
    //    val nullDfJoined = notNullDf.join(nullDf,notNullDf("idx_notNulls") gt nullDf("idx_nulls"),"left");

    //    df.show(30)
    //    dataWithIndex.show(30)
    //    notNullDf.show(10)
    //    nullDf.show(10)
    //    Df2.show(30)
    //    nullDfJoined.show(10);

    //    df.printSchema()
    //    println("Dataframe's schema:")
    return output;
  }

  def transformCSVJson(df: sql.DataFrame, output: String): Unit = {
    println("transformCSVJson")

    //    val listJson = new ListBuffer[java.lang.String]();
    df.filter(col("accession_no_csv").rlike("^[\\d]{4}-[\\d]*")).collect().foreach { row =>
//      println(row.getAs("accession_no_csv").toString);
      val  fileName = "./Data/outputJson/"+row.getAs("accession_no_csv").toString().trim().replaceAll("[\\n,\\r]","")+".json";
      println(fileName);
      val outputStream = new PrintWriter(fileName);
      outputStream.write(convertRowToJSON(row));
      outputStream.close()
    }
    //
    //    val outputStream = new ObjectOutputStream(new FileOutputStream("./Data/output.json"));
    //    outputStream writeObject (listJson)
    //        df.write
    //          //      .format("org.apache.spark.sql.execution.datasources.v2.json.JsonDataSourceV2")
    //          //      .json("inputfile/json/Consolidated_R2_20190327.json")
    //          .json(output)
  }

  def convertRowToJSON(row: Row): String = {
    val m = row.getValuesMap(row.schema.fieldNames)
    val json = JSONObject(m).toString()
    return json;
  }

}


//object DataIngestionObj extends App {
//
//  val csv2jsonobj = new Csv2Json
//  csv2jsonobj.startDataIngestion()
//
//}