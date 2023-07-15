import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  catchError,
  takeUntil
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpCancelService } from '../services/utils/http-cancel.service';
import { ErrorService } from '../services/utils/error.service';
import { UserService } from '../services/user/user.service';
import * as _ from 'lodash';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private httpCancelService: HttpCancelService,
    private userService: UserService,
  ) {
    router.events.subscribe(event => {
      // An event triggered at the end of the activation part of the Resolve phase of routing.
      if (event instanceof ActivationEnd) {
        // Cancel pending calls
        this.httpCancelService.cancelPendingRequests();
      }
    });
  }

  // Intercepta toda chamada HTTP
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log(request.url)
    if (this.isInBlockedList({ url: request.url, method: request.method })) {
      return next.handle(request);
    } else {
      return next.handle(this.addToken(request))
        .pipe(
          takeUntil(this.httpCancelService.onCancelPendingRequests()),
          catchError(ErrorService.handleError)
        );
    }
  }

  // Filtra as urls que não usarão o token
  private isInBlockedList(item: { url: string, method: string } ): Boolean {

    const blockedList = [
      { url: `${environment.apiURL}/user`, method: 'POST' },
      { url: `${environment.apiURL}/login`, method: 'POST' }
    ]

     return blockedList.some((obj) => _.isEqual(obj, item))
  }

  // Adiciona o token à requisição
  private addToken(request: HttpRequest<any>) {
     //console.log(`${environment.apiKey}:${this.headerService.apiTkUser}`)
    return request = request.clone({
      headers: new HttpHeaders({
        'Accept': '*',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json',
        'Authorization': `Bearer :${this.userService.getToken}`,
      })
    });
  }
}
