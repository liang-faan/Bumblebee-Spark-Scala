// import {config} from '../config'
import jwt from "jsonwebtoken"

const isBrowser = () => typeof window !== "undefined"

const getAuthentication = () =>
  isBrowser() && window.localStorage.getItem("access_token")
    ? JSON.parse(window.localStorage.getItem("access_token"))
    : handleLogin()

export function handleLogin(){
    
}

export const isLogin = () => {
      var tokenStr = getAuthentication();
      console.log("Token from localStorage: "+tokenStr);
      if(!tokenStr){
        return false;
      }else{
        var token = jwt.decode(tokenStr)
        var currentTime = new Date();
        var tokenExp=new Date(1000*token.exp)
        if(currentTime<tokenExp){
          return true;
        }
      }
      return false;
}