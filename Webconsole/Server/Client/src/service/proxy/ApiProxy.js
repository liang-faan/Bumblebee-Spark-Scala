import axios from 'axios'
// import { reject, resolve } from 'core-js/fn/promise';
import config from '../../config';

export function constructUrl(relativeUrl){
    return (config.https ? 'https://' : 'http://').concat(config.hostname, ":", config.port, relativeUrl);
}

export function constructHeaders(){
    // var headers = 
}

export function getConfig(relativeUrl, headerPara) {
    return {
        method: 'get',
        url: constructUrl(relativeUrl),
        headers: headerPara
    }
}

export function postConfig (relativeUrl, headerPara) {
    return {
        method: 'post',
        url: constructUrl(relativeUrl),
        headers: headerPara
    }
}

export function requestWithConfig(url, para, headerPara){
    const apiConfig = {
        method: 'get',
        url: this.constructUrl(url),
        headers: headerPara
    }
    let res = axios.request(apiConfig);
    return res;
}

export function postRequest(url, body, headerPara){
    return new Promise(function (resolve, reject) {axios.post(constructUrl(url), body, {method: 'POST',headers: headerPara})
    .then(function(respone){
        console.log(respone);
        console.log(respone.data);
        resolve(respone.data)
    }).catch(function(err){
        console.log(err);
        reject(err);
    })});
    // return res;
}