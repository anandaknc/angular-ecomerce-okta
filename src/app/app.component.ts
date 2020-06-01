import { Component, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from "moment-timezone";
import { UserLgoinService } from "./user-login.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  apiToken: any;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserLgoinService
  ) {}
  ngOnInit() {
    if(!this.userService.loggedIn){
    this.httpClient
      .get(this.userService.baseUrl + "auth/token", {
        withCredentials: true,
        responseType: "text"
      })
      .subscribe(
        r => {
          this.handleTokenSuccess(r);
        },
        error => {
          this.handleTokenError(error);
        }
      );
  
  }
  }

  handleTokenSuccess(apiToken: any) {
    this.apiToken = apiToken;
    localStorage.setItem("apiToken", apiToken);
    this.userService.loggedIn = true;

    if (this.apiToken) {
      const helper = new JwtHelperService();
      const userObj = helper.decodeToken(apiToken);
      if (userObj.exp) {
        userObj.expDate = moment.unix(userObj.exp);
      }
      this.userService.user = userObj;
      this.router.navigate(["home"]);
      this.logoutNew();
    }
  }

  logoutNew() {
    const apiToken = localStorage.getItem('apiToken');
    const logoutUrl = this.userService.baseUrl + 'saml/logout?local=true';
    this.httpClient
      .get(logoutUrl, {
        withCredentials: true,
        responseType: 'text',
      })
      .subscribe(
        (r) => {
          console.log('success');
        },
        (error) => {
          console.log('fail');
        }
      );
  }
  handleTokenError(error: HttpErrorResponse) {
    console.log(error);
    // if (error.status === 401) {
    this.userService.loggedIn = false;
    this.userService.user = null;
    localStorage.removeItem("apiToken");
    this.router.navigate(["login"]);
    //window.location.replace(this.baseUrl + "saml/login");
    //  }
  }
}
