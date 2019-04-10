import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', request);
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + this.getAccessToken(),
        'Accept': 'application/json',
        'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
      }
    })

    return next.handle(request).do(event => { }, err => {
      if (err instanceof HttpErrorResponse && err.status == 401) {
        var profile = "/settings/users/userprofile"
        window.location.href = location.origin + "/#";
      }
    })
  }

  getAccessToken() {
    return localStorage.getItem(location.hostname + "access_token");
  }

  setAccessToken() {
    return localStorage.setItem(location.hostname + "access_token", null);
  }

  getRedis() {
    return true;
  }

  resetCache() {
    this.cookieService.delete('XSRF-TOKEN');
    this.cookieService.delete('authorizedUser');
    document.cookie = 'XSRF-TOKEN=; Path=/;Domain=.' + location.host + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'XSRF-TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.setAccessToken();
    localStorage.clear();
  }
}
