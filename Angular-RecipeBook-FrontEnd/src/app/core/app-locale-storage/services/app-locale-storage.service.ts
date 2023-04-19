import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppLocaleStorageService {
  public setItem<TValueType>(key: string, value: TValueType): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItemValue<TValueType>(key: string): TValueType {
    let parsedValue: TValueType = JSON.parse(localStorage.getItem(key)) as TValueType;

    if (parsedValue !== undefined && parsedValue !== null) {
      return parsedValue;
    }

    return null;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clearStorage(): void {
    localStorage.clear();
  }
}
