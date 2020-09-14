import axios from 'axios'
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
    return axios.post(constructUrl(url), body, {method: 'POST',headers: headerPara})
    .then(function(respone){
        console.log(respone.data);
        return respone.data;
    })
    ;
    // return res;
}