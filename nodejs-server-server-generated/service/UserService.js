'use strict';


/**
 * User Register
 *
 * body User Input user information
 * no response value expected for this operation
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Retrieve user by name
 *
 * userName String Retrieve user informaton based on user name
 * returns User
 **/
exports.getUser = function(userName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "userRoles" : [ {
    "mappingId" : 5,
    "roles" : [ {
      "permissions" : [ {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      }, {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      } ],
      "name" : "name",
      "id" : 7
    }, {
      "permissions" : [ {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      }, {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      } ],
      "name" : "name",
      "id" : 7
    } ],
    "userName" : "userName",
    "userId" : 2
  }, {
    "mappingId" : 5,
    "roles" : [ {
      "permissions" : [ {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      }, {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      } ],
      "name" : "name",
      "id" : 7
    }, {
      "permissions" : [ {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      }, {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      } ],
      "name" : "name",
      "id" : 7
    } ],
    "userName" : "userName",
    "userId" : 2
  } ],
  "password" : "password",
  "failLoginCount" : 5,
  "active" : 6,
  "id" : 0,
  "createdOn" : "2000-01-23T04:56:07.000+00:00",
  "loginCount" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve user roles by userName
 *
 * userName String 
 * returns List
 **/
exports.getUserRoles = function(userName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "mappingId" : 5,
  "roles" : [ {
    "permissions" : [ {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    }, {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    } ],
    "name" : "name",
    "id" : 7
  }, {
    "permissions" : [ {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    }, {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    } ],
    "name" : "name",
    "id" : 7
  } ],
  "userName" : "userName",
  "userId" : 2
}, {
  "mappingId" : 5,
  "roles" : [ {
    "permissions" : [ {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    }, {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    } ],
    "name" : "name",
    "id" : 7
  }, {
    "permissions" : [ {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    }, {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    } ],
    "name" : "name",
    "id" : 7
  } ],
  "userName" : "userName",
  "userId" : 2
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * List all users
 *
 * returns List
 **/
exports.listUsers = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "userRoles" : [ {
    "mappingId" : 5,
    "roles" : [ {
      "permissions" : [ {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      }, {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      } ],
      "name" : "name",
      "id" : 7
    }, {
      "permissions" : [ {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      }, {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      } ],
      "name" : "name",
      "id" : 7
    } ],
    "userName" : "userName",
    "userId" : 2
  }, {
    "mappingId" : 5,
    "roles" : [ {
      "permissions" : [ {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      }, {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      } ],
      "name" : "name",
      "id" : 7
    }, {
      "permissions" : [ {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      }, {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      } ],
      "name" : "name",
      "id" : 7
    } ],
    "userName" : "userName",
    "userId" : 2
  } ],
  "password" : "password",
  "failLoginCount" : 5,
  "active" : 6,
  "id" : 0,
  "createdOn" : "2000-01-23T04:56:07.000+00:00",
  "loginCount" : 1
}, {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "userRoles" : [ {
    "mappingId" : 5,
    "roles" : [ {
      "permissions" : [ {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      }, {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      } ],
      "name" : "name",
      "id" : 7
    }, {
      "permissions" : [ {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      }, {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      } ],
      "name" : "name",
      "id" : 7
    } ],
    "userName" : "userName",
    "userId" : 2
  }, {
    "mappingId" : 5,
    "roles" : [ {
      "permissions" : [ {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      }, {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      } ],
      "name" : "name",
      "id" : 7
    }, {
      "permissions" : [ {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      }, {
        "name" : "name",
        "id" : 9,
        "views" : [ {
          "viewName" : "viewName",
          "id" : 3
        }, {
          "viewName" : "viewName",
          "id" : 3
        } ]
      } ],
      "name" : "name",
      "id" : 7
    } ],
    "userName" : "userName",
    "userId" : 2
  } ],
  "password" : "password",
  "failLoginCount" : 5,
  "active" : 6,
  "id" : 0,
  "createdOn" : "2000-01-23T04:56:07.000+00:00",
  "loginCount" : 1
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

