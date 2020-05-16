import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { UserLgoinService } from '../user-login.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  apiResult:any;
 constructor(private httpClient: HttpClient,private router: Router,private  userService: UserLgoinService) { }

  ngOnInit() {
     if(this.userService.loggedIn){
    this.callApi();
     }
  }
  callApi() {
    const apiToken = localStorage.getItem("apiToken");
    const headers = new HttpHeaders()
            .set("x-auth-token", apiToken);

    this.httpClient
      .get(this.userService.baseUrl +  "api/mycontroller", {
        headers,
        responseType: "text",
      })
      .subscribe(r => {
        this.apiResult = JSON.stringify(r);
      },
        (error) => {
          this.apiResult ='Error While fetching Api result.'
        });
  }
}