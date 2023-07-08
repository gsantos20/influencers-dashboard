import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './sidenav/sidenav.component';
import { NgxMaskPipe, NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { NgxSelectModule } from 'ngx-select-ex';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    NgxMaskPipe,
    NgxMaskDirective,
  ],
  exports: [
    SideNavComponent
  ],
  providers: [
    NgxMaskPipe,
    provideEnvironmentNgxMask()
  ],
})
export class SharedComponentsModule { }
