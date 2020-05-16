import { Component, OnInit } from '@angular/core';
import { UserLgoinService } from '../user-login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private  userService:UserLgoinService) { }
  ngOnInit() {
  }

  loginApi(){
    window.location.replace(this.userService.baseUrl + "saml/login");
  }

}