package process

import org.apache.spark.ml.Pipeline
import org.apache.spark.ml.classification.LogisticRegression
import org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator
import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.sql.functions.{col, explode, split, udf}
import org.apache.spark.ml.feature.{CountVectorizer, RegexTokenizer, StopWordsRemover, StringIndexer}
import org.apache.spark.sql.types.{StringType, StructField, StructType}

object CountryModelTraining {
  def locationClassification(session: SparkSession, df: DataFrame): DataFrame = {

    /**
     * based on creation_place_original_location to label the books
     */

    /**
     * Loading countries from existing files
     */
    val contryHeader = new StructType(Array(
      StructField("countryCode", StringType, false),
      StructField("countryName", StringType, false)
    ))
    val countriesList = session.read
      .format("com.databricks.spark.csv")
      .schema(contryHeader)
      .csv("./LabelData/CountryList.csv")
      .withColumn("countryCodes", split(col("countryCode"), "\\|"))
      .select(
        col("countryCodes").getItem(0).as("countryCode"),
        col("countryCodes").getItem(1).as("countryName")
      );

    /**
     * verify the countries list
     */
    countriesList.show(10)
    /**
     * Filter DataFrame with only analysis column
     */
    val dfLocation = df.select("accession_no_csv", "creation_place_original_location")
      .filter(col("creation_place_original_location").isNotNull)
      .filter(col("creation_place_original_location").notEqual(""))
      .filter(col("accession_no_csv").rlike("^[\\d]{4}-[\\d]*"));

    /**
     * verify the output
     */
    dfLocation.show(5)

    /**
     * count by location, but the location some has multiple words
     */
        dfLocation.groupBy(col("creation_place_original_location"))
          .count()
          .orderBy(col("count").desc)
          .show(50);
    /**
     * Join Countries List
     */

   val labeledCountryDfLocation = dfLocation.join(countriesList, col("creation_place_original_location").contains(col("countryName")));

    labeledCountryDfLocation.show(100)

    /**
     * Spark pipeline analyze
     */

    val regexTokenizer = new RegexTokenizer();
    regexTokenizer.setInputCol("creation_place_original_location");
    regexTokenizer.setOutputCol("location");
    regexTokenizer.+("\\w+");

    /**
     * default set to true and all token become lower case
     */
    regexTokenizer.setToLowercase(false);

    val tokenized = regexTokenizer.transform(dfLocation);
    val countTokens = udf { (words: Seq[String]) => words.length }
    tokenized.select("*")
      .withColumn("tokens", countTokens(col("location")))
      .filter(col("tokens").equalTo(1))
      .show(false);

    val add_stopwords = Array("not", "indicated", "great", "rt", "t", "c", "the")
    val stopwordsRemover = new StopWordsRemover();
    stopwordsRemover.setStopWords(add_stopwords);
    stopwordsRemover.setInputCol("location").setOutputCol("filtered_location");

    val countVectorizer = new CountVectorizer();
    countVectorizer.setInputCol("filtered_location")
      .setOutputCol("features")
      .setVocabSize(10000)
      .setMinDF(5);

    val stringIndex = new StringIndexer();
    stringIndex.setInputCol("creation_place_original_location").setOutputCol("label");

    /**
     * based on Spark pipeline to extract the data
     */

    val pipeline = new Pipeline();
    pipeline.setStages(Array(regexTokenizer, stopwordsRemover, countVectorizer, stringIndex));

    val pipelinefit = pipeline.fit(dfLocation);

    val dataset = pipelinefit.transform(dfLocation);
    dataset.show(20);

    /**
     * random split the data
     */

    val Array(trainingData, testData) = dataset.randomSplit(Array(0.7, 0.3), 100);

    println(trainingData.count());
    println(testData.count());


    /**
     * Model Training and Evaluation
     */

    val logicRegression = new LogisticRegression().setMaxIter(20).setRegParam(0.3).setElasticNetParam(0);
    val lrModel = logicRegression.fit(trainingData);
    val prediction = lrModel.transform(testData);
    prediction.show();

    val evaluator = new MulticlassClassificationEvaluator().setPredictionCol("prediction");
    println(evaluator.evaluate(prediction));

    return dataset;
  }
}
