import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorService } from './services/utils/error.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedComponentsModule } from './shared/shared-components.module';
import { LoginComponent } from './pages/login/login.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
  ],
  imports: [
    SharedComponentsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgxMaskDirective,
    NgxMaskPipe,
    SelectDropDownModule,
  ],
  providers: [
    ErrorService,
    provideEnvironmentNgxMask(),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
