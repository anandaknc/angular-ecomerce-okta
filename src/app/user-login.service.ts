import { Injectable } from "@angular/core";
import * as moment from "moment-timezone";

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserLgoinService {
  public baseUrl: string = "http://28b7b26195ef.ngrok.io/";
  public user: any;
  public loggedIn = false;
  constructor() {}

  isLoggedIn(): boolean {
    const apiToken = localStorage.getItem("apiToken");
    let loggedIn = false;

     if (apiToken) {
      const helper = new JwtHelperService();
      if (!this.user) {
        const userObj = helper.decodeToken(apiToken);
        if (userObj.exp) {
          userObj.exp = moment.unix(userObj.exp);
        }
        this.user = userObj;
      }
      if (!helper.isTokenExpired(apiToken)) {
        loggedIn = true;
        this.loggedIn = true;
      }else{
        this.loggedIn = false;
      }
    }

    return loggedIn;
  }
}
