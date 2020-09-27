'use strict';
var database = require('../db/Database')
var query = require('../Query');

var connection = database.getDatabaseConnection();

/**
 * Retrieve airflow DAGs
 *
 * returns List
 **/
exports.getDags = function() {
  return new Promise(function(resolve, reject) {
//     var examples = {};
//     examples['application/json'] = [ {
//   "isPaused" : true,
//   "flieLoc" : "flieLoc",
//   "description" : "description",
//   "owners" : "owners",
//   "dagId" : "dagId",
//   "lastExpired" : "lastExpired",
//   "isActive" : true,
//   "lastSchedulerRun" : "lastSchedulerRun",
//   "pickleId" : 0,
//   "rootDagId" : "rootDagId",
//   "scheduleInterval" : "scheduleInterval",
//   "defaultView" : "defaultView",
//   "lastPick" : "lastPick",
//   "isSubDag" : true,
//   "schedulerLock" : true
// }, {
//   "isPaused" : true,
//   "flieLoc" : "flieLoc",
//   "description" : "description",
//   "owners" : "owners",
//   "dagId" : "dagId",
//   "lastExpired" : "lastExpired",
//   "isActive" : true,
//   "lastSchedulerRun" : "lastSchedulerRun",
//   "pickleId" : 0,
//   "rootDagId" : "rootDagId",
//   "scheduleInterval" : "scheduleInterval",
//   "defaultView" : "defaultView",
//   "lastPick" : "lastPick",
//   "isSubDag" : true,
//   "schedulerLock" : true
// } ];
    // if (Object.keys(examples).length > 0) {
    //   resolve(examples[Object.keys(examples)[0]]);
    // } else {
    //   resolve();
    // }

    connection.all(query.retrieve_all_dags, (err, row) => {
      if (err || !row) {
        // console.error(err.message);
        var responseObj = {
          "code": "404",
          "message": `Cannot find any DAG`
        };
        reject(responseObj);
      } else {
        // responseObj = JSON.stringify(row);
        // responseObj=row;
        // console.log(responseObj);
        resolve(row);
      }

    });


  });
}

