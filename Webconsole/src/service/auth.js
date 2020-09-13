// import {config} from '../config'
import jwt from "jsonwebtoken"

const isBrowser = () => typeof window !== "undefined"

const getAuthentication = () => isBrowser() && window.localStorage.getItem("access_token")
    ? jwt.decode(window.localStorage.getItem("access_token"))
    : null


export function handleLogin(username, password) {

  if(username){
    window.localStorage.setItem("access_token","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTk5OTY3MDQsIm5iZiI6MTU5OTk5NjcwNCwianRpIjoiNmRjYTc4ZTItMmU3OS00NjY1LTkwNzMtNDI5NGNmMzUwNjM2IiwiZXhwIjoxNTk5OTk3NjA0LCJpZGVudGl0eSI6MSwiZnJlc2giOnRydWUsInR5cGUiOiJhY2Nlc3MifQ.5aBHq78OzAxXbTUyPM-cBqPECnB5vLUMbes2WT-GocM")
  }
  
}

export const isLogin = () => {
  var tokenStr = getAuthentication();
  console.log("Token from localStorage: " + JSON.stringify(tokenStr));
  if (!tokenStr) {
    return false;
  } else {
    // var token = JSON.stringify(tokenStr);
    var token = tokenStr;
    var currentTime = new Date();
    console.log(token.exp)
    var tokenExp = new Date(1000 * token.exp)
    console.log(currentTime)
    console.log(tokenExp)
    if (currentTime < tokenExp) {
      return true;
    }
  }
  return false;
}