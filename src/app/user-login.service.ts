import { Injectable } from "@angular/core";
import * as moment from "moment-timezone";
import * as jwt from "jsonwebtoken";

@Injectable()
export class UserLgoinService {
  public baseUrl: string = "https://0dcc6e9b.ngrok.io/";
  public user: any;
  public loggedIn = false;
  constructor() {}

  isLoggedIn(): boolean {
    const apiToken = localStorage.getItem("apiToken");
    let loggedIn = false;

    if (apiToken) {
      if (!this.user) {
        let userObj = jwt.decode(apiToken);
        if (userObj.exp) {
          userObj.exp = moment.unix(userObj.exp);
        }
        this.user = userObj;
      }
      if (moment().isBefore(this.user.exp)) {
        loggedIn = true;
      }
    }

    return loggedIn;
  }
}
