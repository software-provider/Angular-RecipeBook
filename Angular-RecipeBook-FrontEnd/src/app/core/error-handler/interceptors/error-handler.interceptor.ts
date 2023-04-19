import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { CoreAuthenticationService } from '../../authentication/services/core-authentication.service';
import { RibbonToastrService } from 'src/app/shared/utilities/ribbon-toastr/services/ribbon-toastr.service';
import {
  getBadRequestMessage,
  getInternalServerErrorMessage,
  localizeException,
} from '../helpers/error-handler-interceptor.helper';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  private readonly _httpBadRequestStatusCode: number;
  private readonly _httpUnauthorizedStatusCode: number;

  constructor(
    private router: Router,
    private ribbonToastrService: RibbonToastrService,
    private coreAuthenticationService: CoreAuthenticationService
  ) {
    this._httpBadRequestStatusCode = 400;
    this._httpUnauthorizedStatusCode = 401;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(null, (err: any) => {
        if (err.status === this._httpUnauthorizedStatusCode) {
          // For Unauthorized Error Handling
          this.coreAuthenticationService.signOut();
          this.router.navigate(['/sign-in']);
        } else if (err.status === this._httpBadRequestStatusCode) {
          if (err.error.ExceptionCode) {
            // For Custom Error Handling
            this.ribbonToastrService.error(localizeException(err.error.ExceptionCode));
          } else if (err.error.errors) {
            // For Validation Erorr Handling
            for (const propertyName of Object.keys(err.error.errors)) {
              this.ribbonToastrService.error(err.error.errors[propertyName]);
            }
          } else {
            // For 400 - Unknow Error
            this.ribbonToastrService.error(getBadRequestMessage());

            console.log(err);
          }
        } else {
          this.ribbonToastrService.error(getInternalServerErrorMessage());

          console.log(err);
        }
      })
    );
  }
}
