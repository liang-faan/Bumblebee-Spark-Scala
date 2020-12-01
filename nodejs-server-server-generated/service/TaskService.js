'use strict';


/**
 * retrieve dags schedule from airflow
 *
 * returns List
 **/
exports.getTaskSchedule = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "duration" : 1,
  "endDate" : "endDate",
  "reschduleDate" : "reschduleDate",
  "executionDate" : "executionDate",
  "id" : 0,
  "dagId" : "dagId",
  "tryNumber" : 6,
  "taskId" : "taskId",
  "startDate" : "startDate"
}, {
  "duration" : 1,
  "endDate" : "endDate",
  "reschduleDate" : "reschduleDate",
  "executionDate" : "executionDate",
  "id" : 0,
  "dagId" : "dagId",
  "tryNumber" : 6,
  "taskId" : "taskId",
  "startDate" : "startDate"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * retrieve dags schedule from airflow
 *
 * returns List
 **/
exports.getTasks = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "queuedDateTime" : "queuedDateTime",
  "priorityWeight" : 5,
  "maxTries" : 2,
  "endDate" : "endDate",
  "executorConfig" : "executorConfig",
  "pid" : 5,
  "dagId" : "dagId",
  "operator" : "operator",
  "poolSlots" : 7,
  "duration" : 0.8008281904610115,
  "unixName" : "unixName",
  "jobId" : 1,
  "hostname" : "hostname",
  "executeDate" : "executeDate",
  "state" : "state",
  "tryNumber" : 6,
  "taskId" : "taskId",
  "startDate" : "startDate",
  "queue" : "queue"
}, {
  "queuedDateTime" : "queuedDateTime",
  "priorityWeight" : 5,
  "maxTries" : 2,
  "endDate" : "endDate",
  "executorConfig" : "executorConfig",
  "pid" : 5,
  "dagId" : "dagId",
  "operator" : "operator",
  "poolSlots" : 7,
  "duration" : 0.8008281904610115,
  "unixName" : "unixName",
  "jobId" : 1,
  "hostname" : "hostname",
  "executeDate" : "executeDate",
  "state" : "state",
  "tryNumber" : 6,
  "taskId" : "taskId",
  "startDate" : "startDate",
  "queue" : "queue"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

