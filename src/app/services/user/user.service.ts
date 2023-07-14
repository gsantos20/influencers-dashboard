import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, retry, timeout } from 'rxjs';
import { Results } from 'src/app/models/results';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import { LoginService } from '../login/login.service';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment.development';
import { ErrorService } from '../utils/error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseTelaURL = '/user';

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router,
    private functionsService: FunctionsService,
    private toastr: ToastrService
  ) { }

  public post(dados: User): Observable<Results<User>> {
    return this.http
      .post<Results<User[]>>(
        `${environment.apiURL}` + this.baseTelaURL,
        dados
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

  public delete(id: number): Observable<any> {
    return this.http
      .delete(
        `${environment.apiURL}` +
        `${this.baseTelaURL}` +
        '/' +
        id
      )
      .pipe(
        map((response: any) => {
          if (!response.success) {
            this.tratarError(response.data);
          }
          return response;
        }),
        timeout(environment.timeoutDelete),
        retry(0),
        catchError(ErrorService.handleError)
      );
  }

  tratarError(result: any): any {
    this.toastr.error(result);
  }

  get getId(): string {
    var getToken = localStorage.getItem('login');
    return getToken
      ? JSON.parse(atob(getToken))._id
      : null;
  }

  get getToken(): string {
    var getToken = localStorage.getItem('login');
    return getToken
      ? JSON.parse(atob(getToken)).token
      : null;
  }

  get logged(): boolean {
    var getToken = localStorage.getItem('login');
    var getTokenCookie = this.functionsService.getCookie('login');

    getToken ? (JSON.parse(atob(getToken)) as User)._id : null;
    getTokenCookie ? "ok" : null;

    return getToken && getTokenCookie ? true : false;
  }
}
