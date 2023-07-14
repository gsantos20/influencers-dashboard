import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


export class ErrorService {
  constructor() { }

  public static handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    console.error(error);
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `ERRO : ${error.status}, ` + `DS : ${error.message}` + `# : ${error}`;
    }
    return throwError(errorMessage);

  };


}
