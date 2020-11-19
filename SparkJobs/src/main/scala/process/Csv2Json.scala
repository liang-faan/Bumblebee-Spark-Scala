package process

import java.io._
import java.util.Date

import com.google.gson.GsonBuilder
import jsonclass.{Metadata, OutputCsv, Tag}
import org.apache.commons.io.{FileSystemUtils, FileUtils}
import org.apache.spark.sql
import org.apache.spark.sql.expressions.Window
import org.apache.spark.sql.functions._
import org.apache.spark.sql.{DataFrame, Encoders, SparkSession}
import org.slf4j.LoggerFactory

object Csv2Json {

  val logger = LoggerFactory.getLogger(Csv2Json.getClass);
  val medataSchema = Encoders.product[Metadata].schema;

  def main(args: Array[String]): Unit = {

    /**
     * "fat jar"
     * spark-submit file
     */


    val input = args(0)
    val output = args(1)
    val outputCsvPath = args(2)

    logger.info("input file name: {}", input)
    logger.info("output path {}", output)
    logger.info("output path {}", outputCsvPath)

    logger.info("Initial spark session...")
    val session = connectToSpark()
    val df = readingCSVfile(session, input)
    val outputDf = processCSVFile(df)

    transformCSVJson(outputDf, output, outputCsvPath)
    //val locationIdentifier = CountryModelTraining.locationClassification(session, outputDf);

  }

  def connectToSpark(): SparkSession = {
    val session = SparkSession.builder().appName("CSV to json conversion").master("local").getOrCreate()
    /*val session = SparkSession.builder()
      .appName("CSV to json conversion")
      .master("spark://sparkvm.centralus.cloudapp.azure.com:7077")
      .config("spark.driver.port", "20002")
//      .config("spark.driver.host", "192.168.0.168")
//      .config("spark.driver.bindAddress", "39.109.219.164")
            .config("spark.driver.bindAddress", "192.168.0.168")
            .config("spark.driver.host", "39.109.219.164")
      .config("spark.blockManager.port", "6060")
      .config("spark.executor.memory", "8g")

      /**
       * esSparkConf.setIfMissing("spark.driver.port", "20002")
       * esSparkConf.setIfMissing("spark.driver.host", "MAC_OS_LAN_IP")
       * esSparkConf.setIfMissing("spark.driver.bindAddress", "0.0.0.0")
       * esSparkConf.setIfMissing("spark.blockManager.port", "6060")
       */
      .getOrCreate()*/
    return session
  }

  def readingCSVfile(session: SparkSession, input: String): sql.DataFrame = {
    val df = session.read.format("com.databricks.spark.csv")
      .options(Map("inferSchema" -> "false", "delimiter" -> ",", "header" -> "true", "multiline" -> "true"))
      .schema(medataSchema)
      .csv(input)
    logger.info("DataFrame schema...")
    df.printSchema();
    logger.info("DataFrame size {}", df.count());
    return df
  }

  /**
   *
   * @param df processing DataFrame
   * @return out the DataFrame which processed
   */
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


    /**
     * Merged the records with same id: accession_no_csv
     */
    val DfMerged = Df2.filter(col("accession_no_csv").isNotNull).groupBy("accession_no_csv")
      .agg(trim(concat_ws(" ", collect_list("Image"))).as("Image")
        , trim(concat_ws(" ", collect_list("object_work_type"))).as("object_work_type")
        , trim(concat_ws(" ", collect_list("title_text"))).as("title_text")
        , trim(concat_ws(" ", collect_list("preference"))).as("preference")
        , trim(concat_ws(" ", collect_list("title_language"))).as("title_language")
        , trim(concat_ws(" ", collect_list("creator_2"))).as("creator_2")
        , trim(concat_ws(" ", collect_list("creator_1"))).as("creator_1")
        , trim(concat_ws(" ", collect_list("creator_role"))).as("creator_role")
        , trim(concat_ws(" ", collect_list("creation_date"))).as("creation_date")
        , trim(concat_ws(" ", collect_list("creation_place_original_location"))).as("creation_place_original_location")
        , trim(concat_ws(" ", collect_list("styles_periods_indexing_terms"))).as("styles_periods_indexing_terms")
        , trim(concat_ws(" ", collect_list("inscriptions"))).as("inscriptions")
        , trim(concat_ws(" ", collect_list("inscription_language"))).as("inscription_language")
        , trim(concat_ws(" ", collect_list("scale_type"))).as("scale_type")
        , trim(concat_ws(" ", collect_list("shape"))).as("shape")
        , trim(concat_ws(" ", collect_list("materials_name"))).as("materials_name")
        , trim(concat_ws(" ", collect_list("techniques_name"))).as("techniques_name")
        , trim(concat_ws(" ", collect_list("object_colour"))).as("object_colour")
        , trim(concat_ws(" ", collect_list("edition_description"))).as("edition_description")
        , trim(concat_ws(" ", collect_list("physical_appearance"))).as("physical_appearance")
        , trim(concat_ws(" ", collect_list("subject_terms_1"))).as("subject_terms_1")
        , trim(concat_ws(" ", collect_list("subject_terms_2"))).as("subject_terms_2")
        , trim(concat_ws(" ", collect_list("subject_terms_3"))).as("subject_terms_3")
        , trim(concat_ws(" ", collect_list("subject_terms_4"))).as("subject_terms_4")
        , trim(concat_ws(" ", collect_list("context_1"))).as("context_1")
        , trim(concat_ws(" ", collect_list("context_2"))).as("context_2")
        , trim(concat_ws(" ", collect_list("context_3"))).as("context_3")
        , trim(concat_ws(" ", collect_list("context_4"))).as("context_4")
        , trim(concat_ws(" ", collect_list("context_5"))).as("context_5")
        , trim(concat_ws(" ", collect_list("context_6"))).as("context_6")
        , trim(concat_ws(" ", collect_list("context_7"))).as("context_7")
        , trim(concat_ws(" ", collect_list("context_8"))).as("context_8")
        , trim(concat_ws(" ", collect_list("context_9"))).as("context_9")
        , trim(concat_ws(" ", collect_list("context_10"))).as("context_10")
        , trim(concat_ws(" ", collect_list("context_11"))).as("context_11")
        , trim(concat_ws(" ", collect_list("context_12"))).as("context_12")
        , trim(concat_ws(" ", collect_list("context_13"))).as("context_13")
        , trim(concat_ws(" ", collect_list("context_14"))).as("context_14")
        , trim(concat_ws(" ", collect_list("context_15"))).as("context_15")
        , trim(concat_ws(" ", collect_list("context_16"))).as("context_16")
        , trim(concat_ws(" ", collect_list("context_17"))).as("context_17")
        , trim(concat_ws(" ", collect_list("context_18"))).as("context_18")
        , trim(concat_ws(" ", collect_list("context_19"))).as("context_19")
        , trim(concat_ws(" ", collect_list("context_20"))).as("context_20")
        , trim(concat_ws(" ", collect_list("context_21"))).as("context_21")
        , trim(concat_ws(" ", collect_list("context_22"))).as("context_22")
        , trim(concat_ws(" ", collect_list("context_23"))).as("context_23")
        , trim(concat_ws(" ", collect_list("context_24"))).as("context_24")
        , trim(concat_ws(" ", collect_list("sgcool_label_text"))).as("sgcool_label_text"))
      .toDF();

    val output2 = DfMerged.na.replace(df.columns, Map("NA" -> null));
    output2.show();
    return output2;
  }

  /**
   *
   * @param df     input DataFrame
   * @param output json output path
   */
  def transformCSVJson(df: sql.DataFrame, output: String, outputCsvPath: String): Unit = {

    println("transformCSVJson")

    //    df.printSchema();

    /**
     * searching expected format file name
     * replace all special characters in the file name
     */
    //    df.filter(col("accession_no_csv").rlike("^[\\d]{4}-[\\d]*")).collect().foreach { row =>
    //      val fileName = row.getAs("accession_no_csv").toString().trim().replaceAll("[\\n,\\r]", "__") + ".json";
    //      val content = convertRowToJSON(row);
    //      writeToFile(output, fileName, content);
    //    }

    val filterResult = df.filter(col("accession_no_csv").rlike("^[\\d]{4}-[\\d]*"))

    val outputCsvFolder = new File(outputCsvPath);
    if(outputCsvFolder.exists())
    FileUtils.deleteDirectory(outputCsvFolder);


    filterResult.coalesce(1).write
      .format("csv")
      .option("header", "true")
      .save(outputCsvPath)


    renameCsvOutput(outputCsvPath, "csv", "output.csv")

    /**
     * Convert Row to Object
     */
    val result = filterResult.as(Encoders.product[Metadata]).collect()

    println(result.size)
    //    val outputObjectList = new util.ArrayList[OutputCsv]();
    val gson = new GsonBuilder().setDateFormat("yyyyMMddHHmmss").create();
    result.foreach(meta => {
      val fileName = meta.accession_no_csv.trim().replaceAll("[\\n,\\r]", "__") + ".json";
      val outputObj = new OutputCsv(
        meta.accession_no_csv,
        meta.title_text,
        "Bumblebee",
        output,
        gson.toJson(meta).replace("\"", "").replace(",", "\n").replace("{", "").replace("}", ""),
        null,
        new Date(),
        null,
        0,
        false,
        Array(),
        meta,
        null,
        null,
        null,
        null,
        null,
        null,
        new Date(),
        0,
        null,
        new Tag(null),
        null,
        null
      );
      //      outputObjectList.add(outputObj);
      writeToFile(output, fileName, gson.toJson(outputObj));
    })
    //    println(outputObjectList.size());
  }

  //  /**
  //   *
  //   * @param row convert each row into JSON String
  //   * @return
  //   */
  //  def convertRowToJSON(row: Row): String = {
  //    var m = row.getValuesMap(row.schema.fieldNames)
  //    //    logger.info("Dropping NA or empty columns...");
  //    /**
  //     * dropping NA or empty columns
  //     */
  //    m.keys foreach { key =>
  //      //      if("NA".equals(m.getOrElse(key,null))){
  //      //        m = m.-(key);
  //      //      }else
  //      if ("".equals(m.getOrElse(key, null))) {
  //        m = m.-(key);
  //      }
  //    }
  //    val json = JSONObject(m).toString();
  //    return json;
  //  }

  /**
   *
   * @param path     the file store path
   * @param filename file name
   * @param content  file string content
   */
  def writeToFile(path: String, filename: String, content: String) = {
    val dir = new File(path);
    if (dir.exists()) {
      dir.delete();
      //      dir.mkdir();
    }
    dir.mkdir();
    val file = new File(path + "/" + filename);
    try {
      logger.info("Writing to file {}", filename);
      val fw = new FileWriter(file.getAbsoluteFile());
      val bw = new BufferedWriter(fw);
      bw.write(content);
      bw.close();
    }
    catch {
      case e: FileNotFoundException => println("Couldn't find that file.")
      case e: IOException => println("Had an IOException trying to read that file")
    }
  }

  def renameCsvOutput(path: String, fileType: String, newName: String): Unit = {
    val directory: File = new File(path);
    assert(directory.isDirectory)

    val csvFiles = directory.listFiles.filter(d =>
      d.isFile && d.getName.endsWith(fileType)
    )
    csvFiles.foreach(file => {
      file.renameTo(new File(path+"/"+newName))
      println(file.getAbsolutePath)
    })
  }
}

