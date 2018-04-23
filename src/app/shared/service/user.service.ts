import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export enum userProperty {
  PERSON = 'person',
  PTOKEN = 'person-token',
  LOGIN = 'logged-in'
}

export enum Role {
  CMS_ADMIN = 'MA.invasivePortalAdmin'
}

@Injectable()
export class UserService {

  public loginStateChange: Subject<any> = new Subject<any>();

  constructor(private apiService: ApiService) { }

  public static getLoginUrl(next) {
    return (environment.lajiAuth.authUrl + 'login'
      + '?target=' + environment.lajiAuth.systemID
      + '&redirectMethod=GET&locale=%lang%'
      + '&next=' + next).replace('%lang%', 'fi');
  }

  public static getUserProperties() {
    let res = {};
    for (let u in userProperty) {
      res[userProperty[u]] = JSON.parse(window.sessionStorage.getItem(userProperty[u]));
    }
    return res;
  }

  public static hasRole(role: Role) {
    if (UserService.getUserProperties()[userProperty.PERSON] && UserService.getUserProperties()['person'].hasOwnProperty('role')) {
      return UserService.getUserProperties()[userProperty.PERSON].role.includes(role);
    } else return false;
  }

  public static loggedIn() {
    return UserService.getUserProperties()[userProperty.LOGIN];
  }

  public static setToken(token: string) {
    window.localStorage.setItem("token", token);
  }

  public static getToken() {
    return window.localStorage.getItem("token");
  }

  public static getUserId() {
    return UserService.getUserProperties()[userProperty.PERSON].id;
  }
  
  logout() {
    UserService.clearUserProperties();
    UserService.clearUserToken();
    this.setUserProperty(userProperty.LOGIN, false);
    this.loginStateChange.next();
  }

  private static clearUserProperties() {
    window.sessionStorage.clear();
  }

  private static clearUserToken() {
    window.localStorage.clear();
  }

  setUserProperty(key: userProperty, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  updateUserProperties(token:string) {
    let s: Subject<any> = new Subject<any>();
    this.apiService.personToken(UserService.getToken()).subscribe((data) => { 
      this.setUserProperty(userProperty.PTOKEN, data);
      this.apiService.personByToken(UserService.getToken()).subscribe((data) => {
        // Admin role for testing purposes
        if(!environment.production) {
          data['role'] = [Role.CMS_ADMIN];
        }
        
        this.setUserProperty(userProperty.PERSON, data);

        this.setUserProperty(userProperty.LOGIN, "true");
        this.loginStateChange.next();
        s.next();
      }, (error) => {
        s.next(error);
      });
    }, (error) => {
      s.next(error);
    });
    return s;
  }
}
