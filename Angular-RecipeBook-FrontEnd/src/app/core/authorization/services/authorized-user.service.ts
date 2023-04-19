import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { AuthorizedUserHttpService } from './authorized-user-http.service';
import { AppCacheStorageService } from '../../app-cache-storage/services/app-cache-storage.service';

import { CACHE_STORAGE_KEYS } from '../../app-cache-storage/constants/app-cache-storage-service.constants';

import { AuthorizedUserDataModel } from 'src/app/core/authorization/models/authorized-user-data.model';
import { CacheStorageSaveOptions } from '../../app-cache-storage/models/cache-storage-save-options.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedUserService {
  private userSignInState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //#region GETTERS

  public get userIsSignedIn(): Observable<boolean> {
    return this.authorizedUserHttpService.userIsSignedIn().pipe(
      tap(() => {
        const cacheStorageSaveOptionsItem: CacheStorageSaveOptions = {
          data: true,
          storageKey: CACHE_STORAGE_KEYS['USER_IS_SIGNED_IN'],
        } as CacheStorageSaveOptions;

        this.appCacheService.setItem(cacheStorageSaveOptionsItem);

        this.setUserSignInState(true);
      }),
      map(() => {
        return true;
      })
    );
  }

  public get userIsSignedInFromCache(): Observable<boolean> {
    const userIsSignedIn: boolean = this.appCacheService.getItemValue<boolean>(CACHE_STORAGE_KEYS['USER_IS_SIGNED_IN']);

    if (userIsSignedIn === undefined || userIsSignedIn === null) {
      return this.authorizedUserHttpService.userIsSignedIn().pipe(
        tap(() => {
          const cacheStorageSaveOptionsItem: CacheStorageSaveOptions = {
            data: true,
            storageKey: CACHE_STORAGE_KEYS['USER_IS_SIGNED_IN'],
          } as CacheStorageSaveOptions;

          this.appCacheService.setItem(cacheStorageSaveOptionsItem);
        }),
        map(() => {
          return true;
        })
      );
    }

    return of<boolean>(userIsSignedIn);
  }

  public get authorizedUserDataFromCache(): Observable<AuthorizedUserDataModel> {
    const authorizedUserData: AuthorizedUserDataModel = this.appCacheService.getItemValue<AuthorizedUserDataModel>(
      CACHE_STORAGE_KEYS['AUTHORIZED_USER_DATA']
    );

    if (!authorizedUserData) {
      return this.authorizedUserHttpService.getAuthorizedUserData().pipe(
        tap((response: AuthorizedUserDataModel) => {
          const cacheSaveOptionsItem: CacheStorageSaveOptions = {
            data: response,
            storageKey: CACHE_STORAGE_KEYS['AUTHORIZED_USER_DATA'],
          } as CacheStorageSaveOptions;

          this.appCacheService.setItem(cacheSaveOptionsItem);
        }),
        map((response: AuthorizedUserDataModel) => {
          return response;
        })
      );
    }

    return of<AuthorizedUserDataModel>(authorizedUserData);
  }

  public get userSignInState$(): Observable<boolean> {
    return this.userSignInState.asObservable();
  }

  //#endregion

  constructor(
    private appCacheService: AppCacheStorageService,
    private authorizedUserHttpService: AuthorizedUserHttpService
  ) {}

  public setUserSignInState(signInState: boolean) {
    this.userSignInState.next(signInState);
  }
}
