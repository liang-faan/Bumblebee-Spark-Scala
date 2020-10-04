package process

import org.apache.spark.ml.Pipeline
import org.apache.spark.ml.classification.LogisticRegression
import org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator
import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.functions.{col, udf}
import org.apache.spark.ml.feature.{CountVectorizer, RegexTokenizer, StopWordsRemover, StringIndexer}

object AnalysisCsv {
  def locationClassification(df: DataFrame): DataFrame = {

    /**
     * based on creation_place_original_location to label the books
     */
    /*val drop_list = Array(
      "Image",
      "object_work_type",
      "title_text",
      "preference",
      "title_language",
      "creator_2",
      "creator_1",
      "creator_role",
      "creation_date",
      "styles_periods_indexing_terms",
      "inscriptions",
      "inscription_language",
      "scale_type",
      "shape",
      "materials_name",
      "techniques_name",
      "object_colour",
      "edition_description",
      "physical_appearance",
      "subject_terms_1",
      "subject_terms_2",
      "subject_terms_3",
      "subject_terms_4",
      "context_1",
      "context_2",
      "context_3",
      "context_4",
      "context_5",
      "context_6",
      "context_7",
      "context_8",
      "context_9",
      "context_10",
      "context_11",
      "context_12",
      "context_13",
      "context_14",
      "context_15",
      "context_16",
      "context_17",
      "context_18",
      "context_19",
      "context_20",
      "context_21",
      "context_22",
      "context_23",
      "context_24",
      "sgcool_label_text");*/

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

    dfLocation.groupBy("accession_no_csv").count().orderBy(col("count").desc)
      .show(50);

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

    val Array(trainingData, testData)=dataset.randomSplit(Array(0.7, 0.3), 100);

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
