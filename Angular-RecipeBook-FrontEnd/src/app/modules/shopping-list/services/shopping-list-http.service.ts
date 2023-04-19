import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

import { SaveShoppingListRequestModel } from '../models/request-models/save-shopping-list-request.model';
import { GetLastSavedShoppingListResponseModel } from '../models/response-models/get-last-saved-shopping-list-response.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListHttpService {
  private readonly _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = `${environment.apiUrl}/v1/ShoppingList`;
  }

  public getLastSavedShoppingList(): Observable<GetLastSavedShoppingListResponseModel> {
    const requestUrl: string = `${this._baseUrl}/GetLastSavedShoppingList`;

    return this.http.get<GetLastSavedShoppingListResponseModel>(requestUrl);
  }

  public saveShoppingList(requestModel: SaveShoppingListRequestModel): Observable<any> {
    const requestUrl: string = `${this._baseUrl}/SaveShoppingList`;

    return this.http.post<SaveShoppingListRequestModel>(requestUrl, requestModel);
  }
}
