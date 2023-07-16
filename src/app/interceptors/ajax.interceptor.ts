import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AjaxInterceptor implements HttpInterceptor {

  private pendingRequests = 0;

  constructor(
    private spinner: NgxSpinnerService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.isInBlockedList(request.url)) {
      this.pendingRequests++;
      this.spinner.show();

      return next.handle(request).pipe(

        catchError((error: HttpErrorResponse) => {
          //Hide the spinner
          console.error('HTTP ERR: ', error);
          this.spinner.hide();
          throw (error);
        }),

        finalize(() => {
          //Hide the spinner
          this.pendingRequests--;
          if (!this.pendingRequests) {
            this.spinner.hide();
          }
        }));

    } else {
      return next.handle(request);
    }
  }

  isInBlockedList(url: string) {
    return url.indexOf("login") > -1
  }
}
