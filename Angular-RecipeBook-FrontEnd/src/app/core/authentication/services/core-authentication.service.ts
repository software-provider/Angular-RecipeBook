import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { finalize, mergeMap } from 'rxjs/operators';

import { CoreAuthenticationHttpService } from './core-authentication-http.service';
import { AuthorizedUserService } from '../../authorization/services/authorized-user.service';
import { AppCacheStorageService } from '../../app-cache-storage/services/app-cache-storage.service';
import { AuthorizedUserHttpService } from '../../authorization/services/authorized-user-http.service';
import { LoadingSpinnerService } from '../../../shared/utilities/loading-spinner/services/loading-spinner.service';

import { CACHE_STORAGE_KEYS } from '../../app-cache-storage/constants/app-cache-storage-service.constants';

import { AuthorizedUserDataModel } from 'src/app/core/authorization/models/authorized-user-data.model';
import { CacheStorageSaveOptions } from '../../app-cache-storage/models/cache-storage-save-options.model';
import { SignInRequestModel } from 'src/app/modules/authentication/models/request-models/sign-in-request.model';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthenticationService {
  public constructor(
    private router: Router,
    private appCacheService: AppCacheStorageService,
    private authorizedUserService: AuthorizedUserService,
    private loadingSpinnerService: LoadingSpinnerService,
    private authorizedUserHttpService: AuthorizedUserHttpService,
    private coreAuthenticationHttpService: CoreAuthenticationHttpService
  ) {}

  public signIn(requestModel: SignInRequestModel) {
    this.loadingSpinnerService.show('Sign in...');

    this.coreAuthenticationHttpService
      .signIn(requestModel)
      .pipe(
        mergeMap(() => this.authorizedUserHttpService.getAuthorizedUserData()),
        finalize(() => this.loadingSpinnerService.hide())
      )
      .subscribe((response: AuthorizedUserDataModel) => {
        let cacheSaveOptionsItems: CacheStorageSaveOptions[] = [
          {
            data: true,
            storageKey: CACHE_STORAGE_KEYS['USER_IS_SIGNED_IN'],
          },
          { data: response, storageKey: CACHE_STORAGE_KEYS['AUTHORIZED_USER_DATA'] },
        ];

        this.appCacheService.setMoreItem(cacheSaveOptionsItems);

        this.router.navigate(['/']);
      });
  }

  public signOut() {
    this.coreAuthenticationHttpService.signOut().subscribe(() => {
      const cacheSaveOptionsItem: CacheStorageSaveOptions = {
        data: false,
        storageKey: CACHE_STORAGE_KEYS['USER_IS_SIGNED_IN'],
      };

      this.appCacheService.setItem(cacheSaveOptionsItem);
      this.appCacheService.removeItem(CACHE_STORAGE_KEYS['AUTHORIZED_USER_DATA']);

      this.authorizedUserService.setUserSignInState(false);

      this.router.navigate(['/sign-in']);
    });
  }
}
