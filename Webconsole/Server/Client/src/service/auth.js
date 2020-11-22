import {apiOptions} from '../config'
import jwt from "jsonwebtoken"
import { postRequest } from "./proxy/ApiProxy"

const isBrowser = () => typeof window !== "undefined"

const getAuthentication = () => isBrowser() && window.localStorage.getItem("access_token")
  ? jwt.decode(window.localStorage.getItem("access_token"))
  : null


export function handleLogin(username, password) {

  if (username && password) {
    var authUrl = apiOptions.loginUrl

    var body = { "userName": username, "password": password, "refresh": true, "provider": "db" };

    var headers = {
      'Content-Type': 'application/json'
    }

    return new Promise(function (resolve, reject) {
      postRequest(authUrl, body, headers).then(data => {
        if (data) {
          console.log(data);

          window.localStorage.setItem("access_token", data.access_token)
          window.localStorage.setItem("refresh_token", data.refresh_token)

          // getRequest(config.userUrl,null, constructAuthenticationHeaders()).then(
          //   function(err, res){
          //     if(err){
          //       console.log(err);
          //     }
          //     console.log(res);
          //   }
          // ).catch(function(err){
          //   console.log(err);
          // })
          // ;

          resolve(data);
          
        }
      }).catch(err => {
        reject(err)
      })
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

export const getAccessToken = () => {
  return window.localStorage.getItem("access_token");
}