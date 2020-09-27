import { getRequest, constructAuthenticationHeaders } from './proxy/ApiProxy'
import config from '../config'

export function retrieveUsers() {
  return getRequest(config.userUrl, null, constructAuthenticationHeaders()).then(
      function (res, err) {
        if (err) {
          console.log(err);
        }
        console.log(res.data);
        // resolve(res.data);
        return res.data;
      }
    ).catch(function (err) {
      console.log(err);
      return err;
    });
}
