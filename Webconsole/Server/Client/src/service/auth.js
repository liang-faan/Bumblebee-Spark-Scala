import config from '../config'
import jwt from "jsonwebtoken"
import {postRequest} from "./proxy/ApiProxy"

const isBrowser = () => typeof window !== "undefined"

const getAuthentication = () => isBrowser() && window.localStorage.getItem("access_token")
    ? jwt.decode(window.localStorage.getItem("access_token"))
    : null


export function handleLogin(username, password) {

  if(username && password){
    var authUrl = config.loginUrl
    
    var body = {"userName":username, "password":password, "refresh":true, "provider": "db"};

    var headers = {
      'Content-Type': 'application/json'
    }

    return postRequest(authUrl, body, headers).then(data => {
      console.log(data);
      window.localStorage.setItem("access_token",data.access_token)
      window.localStorage.setItem("refresh_token",data.refresh_token)
      return data;
    }).catch(err => {
      return err
    });
  }
  
}

export const isLogin = () => {
  var tokenStr = getAuthentication();
  // console.log("Token from localStorage: " + JSON.stringify(tokenStr));
  if (!tokenStr) {
    return false;
  } else {
    // var token = JSON.stringify(tokenStr);
    var token = tokenStr;
    var currentTime = new Date();
    // console.log(token.exp)
    var tokenExp = new Date(1000 * token.exp)
    // console.log(currentTime)
    // console.log(tokenExp)
    if (currentTime < tokenExp) {
      return true;
    }
  }
  return false;
}