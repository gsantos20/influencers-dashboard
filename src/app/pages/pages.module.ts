import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { NgxSelectModule } from 'ngx-select-ex';
import { SharedComponentsModule } from '../shared/shared-components.module';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfluencersDetailComponent } from './influencers/influencers-detail/influencers-detail.component';
import { InfluencersListComponent } from './influencers/influencers-list/influencers-list.component';
import { InfluencersComponent } from './influencers/influencers.component';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { AjaxInterceptor } from '../interceptors/ajax.interceptor';


@NgModule({
  imports: [
    NgxMaskDirective,
    NgxMaskPipe,
    SharedComponentsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    NgxSelectModule,
    NgxDatatableModule,
    SelectDropDownModule
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    LoginComponent,
    InfluencersComponent,
    InfluencersListComponent,
    InfluencersDetailComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideEnvironmentNgxMask(),
    { provide: HTTP_INTERCEPTORS, useClass: AjaxInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class PagesModule { }
