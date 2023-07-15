import { AbstractControl } from '@angular/forms';
import { FunctionsService } from '../functions/functions.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }


  public static ValidaEmail(control: AbstractControl) {
    let email = control.value;

    if (!FunctionsService.isEmptyOrSpaces(email)) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(email)) {
        return { invalid: true };
      }
    }

    return null;
  }
}

