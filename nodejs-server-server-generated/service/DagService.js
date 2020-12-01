'use strict';


/**
 * Retrieve airflow DAGs
 *
 * returns List
 **/
exports.getDags = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "isPaused" : true,
  "flieLoc" : "flieLoc",
  "description" : "description",
  "owners" : "owners",
  "dagId" : "dagId",
  "lastExpired" : "lastExpired",
  "isActive" : true,
  "lastSchedulerRun" : "lastSchedulerRun",
  "pickleId" : 0,
  "rootDagId" : "rootDagId",
  "scheduleInterval" : "scheduleInterval",
  "defaultView" : "defaultView",
  "lastPick" : "lastPick",
  "isSubDag" : true,
  "schedulerLock" : true
}, {
  "isPaused" : true,
  "flieLoc" : "flieLoc",
  "description" : "description",
  "owners" : "owners",
  "dagId" : "dagId",
  "lastExpired" : "lastExpired",
  "isActive" : true,
  "lastSchedulerRun" : "lastSchedulerRun",
  "pickleId" : 0,
  "rootDagId" : "rootDagId",
  "scheduleInterval" : "scheduleInterval",
  "defaultView" : "defaultView",
  "lastPick" : "lastPick",
  "isSubDag" : true,
  "schedulerLock" : true
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

