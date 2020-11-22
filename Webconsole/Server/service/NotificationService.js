'use strict';


/**
 * consume notificaitons from Kafka
 *
 * body User publish message body
 * returns List
 **/
exports.publishNotifications = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "code" : 0,
  "message" : "message"
}, {
  "code" : 0,
  "message" : "message"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * consume notificaitons from Kafka
 *
 * appId String App id will be used as kafka consumer group id
 * returns List
 **/
exports.retrieveNotifications = function(appId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "_index" : "_index",
  "_type" : "_type",
  "_source" : {
    "metadata" : {
      "context_23" : "context_23",
      "context_22" : "context_22",
      "context_24" : "context_24",
      "Image" : "Image",
      "materials_name" : "materials_name",
      "subject_terms_3" : "subject_terms_3",
      "subject_terms_4" : "subject_terms_4",
      "subject_terms_1" : "subject_terms_1",
      "accession_no_csv" : "accession_no_csv",
      "subject_terms_2" : "subject_terms_2",
      "context_21" : "context_21",
      "context_20" : "context_20",
      "shape" : "shape",
      "preference" : "preference",
      "inscription_language" : "inscription_language",
      "sgcool_label_text" : "sgcool_label_text",
      "creation_date" : "creation_date",
      "title_language" : "title_language",
      "physical_appearance" : "physical_appearance",
      "scale_type" : "scale_type",
      "creation_place_original_location" : "creation_place_original_location",
      "context_12" : "context_12",
      "techniques_name" : "techniques_name",
      "context_1" : "context_1",
      "context_11" : "context_11",
      "context_2" : "context_2",
      "context_14" : "context_14",
      "context_3" : "context_3",
      "context_13" : "context_13",
      "context_4" : "context_4",
      "context_16" : "context_16",
      "context_5" : "context_5",
      "context_15" : "context_15",
      "inscriptions" : "inscriptions",
      "object_colour" : "object_colour",
      "context_6" : "context_6",
      "context_18" : "context_18",
      "context_7" : "context_7",
      "context_17" : "context_17",
      "context_8" : "context_8",
      "context_9" : "context_9",
      "context_19" : "context_19",
      "edition_description" : "edition_description",
      "creator_role" : "creator_role",
      "creator_2" : "creator_2",
      "creator_1" : "creator_1",
      "object_work_type" : "object_work_type",
      "styles_periods_indexing_terms" : "styles_periods_indexing_terms",
      "title_text" : "title_text",
      "context_10" : "context_10"
    },
    "nlpDate" : "nlpDate",
    "connectorId" : 1,
    "roles" : [ "roles", "roles" ],
    "source" : "source",
    "title" : "title",
    "version" : 6,
    "content" : "content",
    "tags" : { },
    "path" : "path",
    "id" : "id",
    "createDate" : "createDate",
    "latest" : true
  },
  "_id" : "_id",
  "_score" : 0.8008281904610115
}, {
  "_index" : "_index",
  "_type" : "_type",
  "_source" : {
    "metadata" : {
      "context_23" : "context_23",
      "context_22" : "context_22",
      "context_24" : "context_24",
      "Image" : "Image",
      "materials_name" : "materials_name",
      "subject_terms_3" : "subject_terms_3",
      "subject_terms_4" : "subject_terms_4",
      "subject_terms_1" : "subject_terms_1",
      "accession_no_csv" : "accession_no_csv",
      "subject_terms_2" : "subject_terms_2",
      "context_21" : "context_21",
      "context_20" : "context_20",
      "shape" : "shape",
      "preference" : "preference",
      "inscription_language" : "inscription_language",
      "sgcool_label_text" : "sgcool_label_text",
      "creation_date" : "creation_date",
      "title_language" : "title_language",
      "physical_appearance" : "physical_appearance",
      "scale_type" : "scale_type",
      "creation_place_original_location" : "creation_place_original_location",
      "context_12" : "context_12",
      "techniques_name" : "techniques_name",
      "context_1" : "context_1",
      "context_11" : "context_11",
      "context_2" : "context_2",
      "context_14" : "context_14",
      "context_3" : "context_3",
      "context_13" : "context_13",
      "context_4" : "context_4",
      "context_16" : "context_16",
      "context_5" : "context_5",
      "context_15" : "context_15",
      "inscriptions" : "inscriptions",
      "object_colour" : "object_colour",
      "context_6" : "context_6",
      "context_18" : "context_18",
      "context_7" : "context_7",
      "context_17" : "context_17",
      "context_8" : "context_8",
      "context_9" : "context_9",
      "context_19" : "context_19",
      "edition_description" : "edition_description",
      "creator_role" : "creator_role",
      "creator_2" : "creator_2",
      "creator_1" : "creator_1",
      "object_work_type" : "object_work_type",
      "styles_periods_indexing_terms" : "styles_periods_indexing_terms",
      "title_text" : "title_text",
      "context_10" : "context_10"
    },
    "nlpDate" : "nlpDate",
    "connectorId" : 1,
    "roles" : [ "roles", "roles" ],
    "source" : "source",
    "title" : "title",
    "version" : 6,
    "content" : "content",
    "tags" : { },
    "path" : "path",
    "id" : "id",
    "createDate" : "createDate",
    "latest" : true
  },
  "_id" : "_id",
  "_score" : 0.8008281904610115
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

