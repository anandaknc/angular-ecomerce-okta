import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserLgoinService } from "../user-login.service";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"]
})
export class TopBarComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserLgoinService
  ) {}

  ngOnInit() {}

  logoutNew(global: string) {
    const apiToken = localStorage.getItem("apiToken");
    let logoutUrl = this.userService.baseUrl + "api/logout?jwt=" + apiToken;
const headers = new HttpHeaders()
            .set("x-auth-token", apiToken);
    this.httpClient
      .post(logoutUrl,'',{
        headers,
        responseType: "text"
      })
      .subscribe(
        r => {
          console.log("success");
        },
        error => {
          console.log("fail");
        }
      );
    this.userService.user = null;
    this.userService.loggedIn = false;
    console.log("success");
    this.router.navigate(["logout"]);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
