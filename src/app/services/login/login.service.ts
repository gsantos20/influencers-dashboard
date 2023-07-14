import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, tap, timeout } from 'rxjs/operators';
import { Results } from 'src/app/models/results';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseTelaURL = '/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
	) {}

  public Login(user: Login): Observable<Results<Login>> {
    return this.http
      .post<Results<Login>>(
        `${environment.apiURL}` + `${this.baseTelaURL}`,
        user,
      )
      .pipe(
        map((response: any) => {
          console.log(response)
          if (!response.success) {
            this.toastr.error(response.data);
          }
          return response;
        }),
        timeout(environment.timeoutPost),
        retry(0)
      );
  }

	public Logoff() {
		localStorage.clear();
		this.router.navigate(['login']);
	}
}

