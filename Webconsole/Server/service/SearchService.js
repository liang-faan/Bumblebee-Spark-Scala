'use strict';
const axios = require('axios')
var config = require('../Config')
var kafka = require('../utils/KafkaUtils')
const { v4 } = require('uuid');
/**
 * searching books from elastic
 *
 * q String searching content
 * searchIndex String 
 * searchAction String 
 * returns List
 **/
exports.elasticSearch = function (param, searchIndex, searchAction) {
  console.log(`searching ${searchIndex}`)
  console.log(`search action ${searchAction}`)
  console.log(`searching parameter ${param}`)

  kafka.sendKafkaMessage("user_info", { value: JSON.stringify({ userId: Math.floor(Math.random()*71567)}), key: v4() })
  
  var url1 = config.elasticSearchUrl + searchIndex + "/" + searchAction
  console.log(`requesting ${url1}`)

  return new Promise(function (resolve, reject) {

    var searchResult={};

    const apiConfig = {
      url: url1,
      method: "GET",
      // headers: headerPara,
      params: { q: param, sort: {createdDate:{order:'desc'}}, size: 200}
    }
    axios.request(apiConfig).then(function (response) {
      // handle success
      console.log(response);
      resolve(response.data.hits.hits)
    }).catch(function (error) {
      // handle error
      console.log(error);
      reject(error)
    }).then(function () {
      // always executed
    });

    // var examples = {};
    // examples['application/json'] = [{
    //   "code": 0,
    //   "message": "message"
    // }, {
    //   "code": 0,
    //   "message": "message"
    // }];
    // if (Object.keys(examples).length > 0) {
    //   resolve(examples[Object.keys(examples)[0]]);
    // } else {
    //   resolve();
    // }
  });
}

