const axios = require('axios');
import { map } from 'core-js/fn/array';
import config, { headers } from '../../config';

function constructUrl(relativeUrl){
    reutrn (config.https ? 'https://' : 'http://').concat(config.hostname, ":", config.port, relativeUrl);
}

function constructHeaders(){
    // var headers = 
}

function getConfig(relativeUrl) {
    return {
        method: 'get',
        url: constructUrl(relativeUrl),
        headers: constructHeaders()
    }
}

function postConfig (relativeUrl) {
    return {
        method: 'post',
        url: constructUrl(relativeUrl),
        headers: constructHeaders()
    }
}