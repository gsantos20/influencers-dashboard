import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './sidenav/sidenav.component';
import { NgxMaskPipe, NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { NgxSelectModule } from 'ngx-select-ex';
import { RouterModule } from '@angular/router';
import { TopNavComponent } from './topnav/topnav.component';
import { TituloComponent } from './titulo/titulo.component';
import { ModalDeleteComponent } from './modal/modal-delete/modal-delete.component';


@NgModule({
  declarations: [
    SideNavComponent,
    TopNavComponent,
    TituloComponent,
    ModalDeleteComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    NgxMaskPipe,
    NgxMaskDirective
  ],
  exports: [
    SideNavComponent,
    TopNavComponent,
    TituloComponent,
    ModalDeleteComponent
  ],
  providers: [
    NgxMaskPipe,
    provideEnvironmentNgxMask()
  ],
})
export class SharedComponentsModule { }
