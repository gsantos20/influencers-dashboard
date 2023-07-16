import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


export class ErrorService {
  constructor() { }

  public static handleError(error: any) {
    let errorMessage = '';
    console.error(error);
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.data;
    } else {
      errorMessage = `ERRO : ${error.status}, ` + `DS : ${error.error.data}` + `# : ${error}`;
    }
    return throwError(errorMessage);

  };


}
