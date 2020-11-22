import axios from 'axios'
// import { reject, resolve } from 'core-js/fn/promise';
import {apiOptions} from '../../config';
import {getAccessToken} from '../auth'

export function constructUrl(relativeUrl) {
    return (apiOptions.protocal).concat("://",apiOptions.hostname, ":", apiOptions.port, relativeUrl);
}

export function constructAuthenticationHeaders() {

    var token = getAccessToken();

    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    return headers;
}

export function getConfig(relativeUrl, headerPara) {
    return {
        method: 'get',
        // url: constructUrl(relativeUrl),
        url: relativeUrl,
        headers: headerPara
    }
}

export function postConfig(relativeUrl, headerPara) {
    return {
        method: 'post',
        headers: headerPara
    }
}

export function requestWithConfig(url1, para, headerPara, mth) {
    const apiConfig = {
        url: url1,
        method: mth,
        headers: headerPara,
        params: para
    }
    let res = axios.request(apiConfig);
    return res;
}

export function postRequest(url, body, headerPara) {
    return new Promise(function (resolve, reject) {
        axios.post(url, body, { method: 'POST', headers: headerPara })
        .then(function (respone) {
            console.log(respone);
            console.log(respone.data);
            resolve(respone.data)
        }).catch(function (err) {
            console.log(err);
            reject(err);
        })
    });
    // return res;
}

export function getRequest(url, para, headerPara){
    // console.log(headerPara);
    // return axios.get(url,para,{method:'GET',headers:headerPara});
    return requestWithConfig(url, para, headerPara, 'get');
}