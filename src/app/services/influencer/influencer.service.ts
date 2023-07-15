import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, timeout, retry, catchError } from 'rxjs';
import { User } from 'src/app/models/User';
import { Results } from 'src/app/models/results';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { ErrorService } from '../utils/error.service';
import { Influencer } from 'src/app/models/Influencer';

@Injectable({
  providedIn: 'root'
})
export class InfluencerService {
  baseTelaURL = '/influencer';

    constructor(
      private http: HttpClient,
      private loginService: LoginService,
      private router: Router,
      private functionsService: FunctionsService,
      private toastr: ToastrService
    ) { }


  public GetInfluencer(parametros: Partial<Influencer>): Observable<Results<Influencer[]>> {
    return this.http
      .get<Results<Partial<User>>>(
        `${environment.apiURL}/influencers?`
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

  public CreateInfluencer(dados: Omit<User, '_id'>): Observable<Results<User>> {
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

  public DeleteInfluencer(id: number): Observable<any> {
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
}
