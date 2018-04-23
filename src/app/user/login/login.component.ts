import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService, userProperty } from '../../shared/service/user.service';

/**
 * This component is loaded when laji-auth redirects the client
 * to /user/login?token=...
 * 
 * 1. Captures the token url parameter and stores it in UserService
 * 2. Requests UserService to update the session based on token
 * 3. Redirects the client to whatever page they were in before the
 * login operation started
 * 
 * Note that redirection requires UserService to complete an API request
 * on laji.fi server, because the next page parameter is stored there
 */

@Component({
  selector: 'vrs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams['token']) {
      // save laji-auth token to userproperties
      UserService.setToken(this.activatedRoute.snapshot.queryParams['token']);
      // update userproperties with laji api data
      this.userService.updateUserProperties(UserService.getToken()).subscribe((err)=>{
        if(err) {
          alert("Login failed: Invalid person-token\nStatus: " + err.status + "\nDescription: " + err.statusText);
          this.router.navigateByUrl("/home");
          return;
        }
        this.router.navigateByUrl(UserService.getUserProperties()["person-token"].next);
      });
    } else {
      this.router.navigateByUrl("/home");
    }
  }
}
