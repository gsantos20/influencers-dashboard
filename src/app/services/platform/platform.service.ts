import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, retry, timeout } from 'rxjs';
import { Platform } from 'src/app/models/Platform';
import { User } from 'src/app/models/User';
import { Results } from 'src/app/models/results';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { ErrorService } from '../utils/error.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  baseTelaURL = '/platforms';

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router,
    private functionsService: FunctionsService,
    private toastr: ToastrService
  ) { }

  public GetPlatform(parametros: Partial<Platform>): Observable<Results<Platform>> {
    console.log(parametros)
    return this.http
      .get<Results<User[]>>(
        `${environment.apiURL}${this.baseTelaURL}?`
        + FunctionsService.jsonToQueryString(parametros)
      )
      .pipe(
        map((response: any) => {
          if (!response.success) {
            this.tratarError(response.data);
          }
          return response;
        }),
        timeout(environment.timeoutPost),
        retry(0),
        catchError(ErrorService.handleError)
      );
  }

  tratarError(result: any): any {
    this.toastr.error(result);
  }
}
