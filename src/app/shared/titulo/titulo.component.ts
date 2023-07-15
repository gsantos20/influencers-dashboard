import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {
  @Input() titulo!: string;
  @Input() subtitulo = 'Influencer Dashboard';
  @Input() iconClass = 'fa fa-users';
  @Input() botaoListar = false;

  constructor(
        private router: Router
        ) {

  }

  ngOnInit() {
    this.subtitulo = this.router.url.toLocaleLowerCase();
  }

  listar() : void {
    this.router.navigate([`/${this.titulo.toLocaleLowerCase()}/list`]);
  }

}
