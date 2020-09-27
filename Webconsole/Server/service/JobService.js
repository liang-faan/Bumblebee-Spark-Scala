'use strict';


/**
 * retrieve dags schedule from airflow
 *
 * returns List
 **/
exports.getJobs = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "lastHeartBeat" : "lastHeartBeat",
  "unixName" : "unixName",
  "hostname" : "hostname",
  "executorClass" : "executorClass",
  "endDate" : "endDate",
  "id" : 0,
  "dag_id" : "dag_id",
  "state" : "state",
  "jobType" : "jobType",
  "startDate" : "startDate"
}, {
  "lastHeartBeat" : "lastHeartBeat",
  "unixName" : "unixName",
  "hostname" : "hostname",
  "executorClass" : "executorClass",
  "endDate" : "endDate",
  "id" : 0,
  "dag_id" : "dag_id",
  "state" : "state",
  "jobType" : "jobType",
  "startDate" : "startDate"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

