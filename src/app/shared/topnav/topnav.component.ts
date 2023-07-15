import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { FunctionsService } from '../functions/functions.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopNavComponent {

  constructor(
		private toastr: ToastrService,
		private router: Router,
    private functionsService: FunctionsService,
    private userService: UserService,
	) { }

  FirstName = "Gustavo";

  LogOff() {
		this.toastr.success('Encerrando Sessão', 'Saindo...');

    localStorage.clear();
    this.functionsService.deleteCookie('login');
    this.router.navigate(['login']);

		return false;
	}

}
