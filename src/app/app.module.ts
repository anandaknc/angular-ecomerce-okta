import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { UserLgoinService } from "./user-login.service";
import { PostlogoutComponent } from "./postlogout/postlogout.component";
import { LoginAuthGuard } from "./login-auth.guard";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      {
        path: "home",
        component: HomeComponent,
        canActivate:[LoginAuthGuard],
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "logout",
        component: PostlogoutComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    LoginComponent,
    PostlogoutComponent
  ],

  bootstrap: [AppComponent],
  providers: [LoginAuthGuard,UserLgoinService]
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
