import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { SignInRequestModel } from 'src/app/modules/authentication/models/request-models/sign-in-request.model';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthenticationHttpService {
  private readonly _baseUrl: string;

  public constructor(private http: HttpClient) {
    this._baseUrl = `${environment.apiUrl}/v1/Authentication`;
  }

  public signIn(requestModel: SignInRequestModel): Observable<Object> {
    const requestUrl: string = `${this._baseUrl}/SignIn`;

    return this.http.post(requestUrl, requestModel);
  }

  public signOut(): Observable<Object> {
    const requestUrl: string = `${this._baseUrl}/SignOut`;

    return this.http.get(requestUrl);
  }
}
