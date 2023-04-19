import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { SidebarModule } from 'ng-sidebar';
import { CommonModule } from '@angular/common';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxCurrencyModule } from 'ngx-currency';
import { AppRoutingModule } from '../app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RibbonToastrComponent } from '../shared/utilities/ribbon-toastr/container/ribbon-toastr.component';

import { ngxCurrencyDefaultMaskOptions } from './utilities/ngx-currency/constants/ngx-currency.constants';

import { AuthorizationInterceptor } from './authorization/interceptors/authorization.interceptor';
import { ErrorHandlerInterceptor } from './error-handler/interceptors/error-handler.interceptor';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      toastComponent: RibbonToastrComponent,
    }),
    UiSwitchModule.forRoot({
      size: 'small',
    }),
    SidebarModule.forRoot(),
    NgxCurrencyModule.forRoot(ngxCurrencyDefaultMaskOptions),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
    Title,
  ],
})
export class CoreModule {}
