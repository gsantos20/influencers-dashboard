import { Component, OnInit, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { setTheme } from 'ngx-bootstrap/utils';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'sidenav';
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(
    private router: Router
  ) {
    setTheme('bs5');

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

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }


}
