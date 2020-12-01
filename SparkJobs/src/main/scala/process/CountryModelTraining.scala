package process

import org.apache.spark.ml.Pipeline
import org.apache.spark.ml.classification.{LogisticRegression, MultilayerPerceptronClassifier}
import org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator
import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.sql.functions.{col, explode, lower, split, udf}
import org.apache.spark.ml.feature.{CountVectorizer, IndexToString, RegexTokenizer, StopWordsRemover, StringIndexer, Word2Vec}
import org.apache.spark.sql.types.{StringType, StructField, StructType}

object CountryModelTraining {

  final val VECTOR_SIZE = 100;

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

    val labeledCountryDfLocation = dfLocation.join(countriesList, col("creation_place_original_location")
      .contains(col("countryName")));

    /**
     * Spark pipeline analyze
     */

    /**
     * convert creation_place_original_location into locationText array.
     */
    val regexTokenizer = new RegexTokenizer();
    regexTokenizer.setInputCol("creation_place_original_location");
    regexTokenizer.setOutputCol("locationText");
    regexTokenizer.setPattern("\\W") //text to be predict
    //    regexTokenizer.+("\\w+");
    /**
     * default set to true and all token become lower case
     */
    regexTokenizer.setToLowercase(true);

    //    val tokenized = regexTokenizer.transform(labeledCountryDfLocation);
    //    tokenized.show(100)

    /**
     * display tokens before predict
     */
    //    val countTokens = udf { (words: Seq[String]) => words.length }
    //    tokenized.select("*")
    //      .withColumn("tokens", countTokens(col("locationText")))
    //      .filter(col("tokens").equalTo(1))
    //      .show(false);

    val add_stopwords = Array("not", "indicated", "are", "is", "at", "the", "created", "by")
    val stopwordsRemover = new StopWordsRemover();
    stopwordsRemover.setStopWords(add_stopwords);
    stopwordsRemover.setInputCol("locationText").setOutputCol("filteredLocationText"); //filtered text

    /**
     * configure labels
     */
    val stringIndex = new StringIndexer()
      .setInputCol("countryName")
      .setOutputCol("countryLabel")
      .fit(labeledCountryDfLocation);

    println("stringIndex.labels.size {}", stringIndex.labels.size);

    stringIndex.labels.foreach {
      str =>
        println(str)
    }

    /**
     * Create word vectors
     */
    val word2Vec = new Word2Vec().setInputCol("filteredLocationText").setOutputCol("features").setVectorSize(VECTOR_SIZE).setMinCount(1)

    val layers = Array[Int](VECTOR_SIZE, 6, 5, stringIndex.labels.size);
    val mlpc = new MultilayerPerceptronClassifier()
      .setLayers(layers)
      .setBlockSize(512)
      .setSeed(1234L)
      .setMaxIter(128)
      .setFeaturesCol("features")
      .setLabelCol("countryLabel")
      .setPredictionCol("prediction");

    /**
     * prediction labels
     */

    val labelConverter = new IndexToString()
      .setInputCol("prediction")
      .setOutputCol("predictionLabel")
      .setLabels(stringIndex.labels);

    /**
     * based on Spark pipeline to extract the data
     */


    val pipeline = new Pipeline();
    pipeline.setStages(Array(stringIndex, regexTokenizer, stopwordsRemover, word2Vec, mlpc, labelConverter));

    /**
     * random split the data
     */

    val Array(trainingData, testData) = labeledCountryDfLocation.randomSplit(Array(0.8, 0.2), 112);
    println(trainingData.count());
    println(testData.count());


    val pipelinefit = pipeline.fit(trainingData);

//    pipelinefit.save("");// => input text -> API input json -> model -> come out recommand
    /**
     * evaluate the result
     */

    val dataset = pipelinefit.transform(testData);
    dataset.show(20);

    val evaluator = new MulticlassClassificationEvaluator().setLabelCol("countryLabel").setPredictionCol("prediction").setMetricName("accuracy")
    val predictionAccuracy = evaluator.evaluate(dataset);
    println("Testing Accuracy is %2.4f".format(predictionAccuracy * 100) + "%")

    /**
     * Model Training and Evaluation
     */
    val resultTransfer= pipelinefit.transform(dfLocation);
    resultTransfer.show(50)
    return resultTransfer;
  }
}
