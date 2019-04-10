import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';;
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { menuList } from 'lr/app/shared/menu.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataStorageService {
  dataIsLoading = new BehaviorSubject<boolean>(false);
  private menuList: menuList;
  menuChanges = new Subject<menuList>();
  segments = [];

  constructor(private httpClient: HttpClient,private router: Router,private cookieService: CookieService) {
  }

  getMenuList() {
    return this.menuList;
  }

  setMenuList(menuList: menuList) {
    this.menuList = menuList;
    this.menuChanges.next(this.menuList);
  }
                                       /* Shared OTher API */
  onLogout(data: any) {
    this.httpClient.post('/clpapi/member/logout', data, {
      observe: 'body',
      responseType: 'json',
    })
      .subscribe(
      (response: Response) => {
        this.resetCache();
        location.href = location.origin + "/#";
      },
      (error) => {
        location.href = location.origin + "/#";
        console.log(error)
      }
      );
  }

  onFetchConfig(ConfigName) {
    this.httpClient.get('/clpapi/setting/getConfigValue/configName/' + ConfigName, {
      observe: 'body',
      responseType: 'json',
    })
      .subscribe(
      (response: Response) => {
        const SMS_Enabled = response["SMS_Enabled"];
        localStorage.setItem( "SMS_Enabled",SMS_Enabled);
      },
      (error) => {
      }
      );
  }

  onFetchMenu() {
    this.httpClient.get('/api/odata/NavigationMenus/Default.GetLoginMenuItems?$orderby=SortOrder', {
      observe: 'body',
      responseType: 'json',
    })
      .subscribe(
      (response: menuList) => {
        this.setMenuList(response);
      },
      (error) => console.log(error)
      );
  }

  resetCache() {
    this.cookieService.delete('XSRF-TOKEN');
    this.cookieService.delete('authorizedUser');
    document.cookie = 'XSRF-TOKEN=; Path=/;Domain=.' + location.host + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'XSRF-TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.setAccessToken();
    localStorage.clear();
    location.href = location.origin + "/#" + "/login";
  }

  CleanLocalStorage() {
    localStorage.removeItem(location.hostname + "");
    localStorage.removeItem(location.hostname + "");
    localStorage.removeItem('currentGame');
  }

  setAccessToken() {
    return localStorage.setItem(location.hostname + "access_token", null);
  }

  getAccountId() {
    return localStorage.getItem(location.hostname + "ClientId");
  }

}