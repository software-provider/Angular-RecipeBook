import { Injectable } from '@angular/core';

import { AppLocaleStorageService } from '../../app-locale-storage/services/app-locale-storage.service';

import { CacheStorageItem } from '../models/cache-storage-item.model';
import { CacheStorageSaveOptions } from '../models/cache-storage-save-options.model';

@Injectable({
  providedIn: 'root',
})
export class AppCacheStorageService {
  public constructor(private appLocaleStorageService: AppLocaleStorageService) {}

  public setItem(cacheStorageSaveOptionsItem: CacheStorageSaveOptions) {
    cacheStorageSaveOptionsItem.expirationMins = cacheStorageSaveOptionsItem.expirationMins || 60;

    const expirtaionMillis =
      cacheStorageSaveOptionsItem.expirationMins !== 0
        ? this.minsToMillis(cacheStorageSaveOptionsItem.expirationMins)
        : 0;

    const cacheStorageItem: CacheStorageItem = {
      data:
        typeof cacheStorageSaveOptionsItem.data === 'string'
          ? cacheStorageSaveOptionsItem.data
          : JSON.stringify(cacheStorageSaveOptionsItem.data),
      expiration: new Date().getTime() + expirtaionMillis,
    };

    this.appLocaleStorageService.setItem<CacheStorageItem>(cacheStorageSaveOptionsItem.storageKey, cacheStorageItem);
  }

  public setMoreItem(cacheStorageSaveOptionsItems: CacheStorageSaveOptions[]) {
    cacheStorageSaveOptionsItems.forEach(item => {
      this.setItem(item);
    });
  }

  public getItemValue<TValueType>(storageKey: string): TValueType {
    const cacheStorageItem = this.appLocaleStorageService.getItemValue<CacheStorageItem>(storageKey);

    const now = new Date().getTime();

    if (!cacheStorageItem || cacheStorageItem.expiration <= now) {
      return null;
    } else {
      const resultValue: TValueType = JSON.parse(cacheStorageItem.data) as TValueType;

      if (resultValue !== undefined && resultValue !== null) {
        return resultValue;
      }

      return null;
    }
  }

  public removeItem(storageKey: string): void {
    this.appLocaleStorageService.removeItem(storageKey);
  }

  public clearStorage(): void {
    this.appLocaleStorageService.clearStorage();
  }

  private minsToMillis(minutes: number) {
    return minutes * 60 * 1000;
  }
}
