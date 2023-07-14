import { Component, OnInit, isDevMode } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    private loginService: LoginService,
  ) {
    setTheme('bs5');

  }

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  deslogar() {
    this.loginService.Logoff();
  }

  ngOnInit() {
    if (isDevMode()) {
      console.info(`%cDevelopment!`, "color: green; font-size: 2em");
    } else {
      console.info(`%cHold on!`, "color: red; font-size: 3em");
      console.info(`%cThis browser feature is intended for developers.\nIf someone instructed you to copy and paste something here to enable some feature or to "hack" someone's account, it usually means he's trying to get access to your account.`, "font-size: 1.5em;");
      console.info(`%cPlease proceed with caution.`, "color: orange; font-size: 1.5em;");
    }
  }

}
