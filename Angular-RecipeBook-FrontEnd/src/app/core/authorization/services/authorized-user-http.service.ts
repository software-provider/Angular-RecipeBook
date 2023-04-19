import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AuthorizedUserDataModel } from 'src/app/core/authorization/models/authorized-user-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedUserHttpService {
  private readonly _baseUrl: string;

  public constructor(private http: HttpClient) {
    this._baseUrl = `${environment.apiUrl}/v1/AuthorizedUser`;
  }

  public userIsSignedIn(): Observable<Object> {
    const requestUrl: string = `${this._baseUrl}/UserIsSignedIn`;

    return this.http.get(requestUrl);
  }

  public getAuthorizedUserData(): Observable<AuthorizedUserDataModel> {
    const requestUrl: string = `${this._baseUrl}/GetAuthorizedUserData`;

    return this.http.get<AuthorizedUserDataModel>(requestUrl);
  }
}
