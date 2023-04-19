import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

import { UpdateRecipeRequestModel } from '../models/request-models/update-recipe-request.model';
import { DeleteRecipeRequestModel } from '../models/request-models/delete-recipe-request.model';
import { CreateRecipeRequestModel } from '../models/request-models/create-recipe-request.model';
import { GetRecipeByIdRequestModel } from '../models/request-models/get-recipe-by-id-request.model';
import { GetAllRecipeResponseModel } from '../models/response-models/get-all-recipe-response.model';
import { GetRecipeByIdResponseModel } from '../models/response-models/get-recipe-by-id-response.model';
import { RecipeNameIsExistRequestModel } from '../models/request-models/recipe-name-is-exist-request.model';
import { RecipeNameIsExistResponseModel } from '../models/response-models/recipe-name-is-exist-response.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeHttpService {
  private readonly _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = `${environment.apiUrl}/v1/Recipe`;
  }

  public getAllRecipe(): Observable<GetAllRecipeResponseModel> {
    const requestUrl: string = `${this._baseUrl}/GetAll`;

    return this.http.get<GetAllRecipeResponseModel>(requestUrl);
  }

  public getRecipeById(requestModel: GetRecipeByIdRequestModel): Observable<GetRecipeByIdResponseModel> {
    const requestUrl: string = `${this._baseUrl}/GetById`;

    return this.http.post<GetRecipeByIdResponseModel>(requestUrl, requestModel);
  }

  public createNewRecipe(recipe: CreateRecipeRequestModel): Observable<Object> {
    const requestUrl: string = `${this._baseUrl}/Create`;

    return this.http.post(requestUrl, recipe);
  }

  public updateRecipe(requestModel: UpdateRecipeRequestModel): Observable<Object> {
    const requestUrl: string = `${this._baseUrl}/Update`;

    return this.http.put(requestUrl, requestModel);
  }

  public deleteRecipe(requestModel: DeleteRecipeRequestModel): Observable<Object> {
    const requestUrl: string = `${this._baseUrl}/Delete`;

    return this.http.post(requestUrl, requestModel);
  }

  public checkRecipeNameIsExist(requestModel: RecipeNameIsExistRequestModel) {
    const requestUrl: string = `${this._baseUrl}/RecipeNameIsExist`;

    return this.http.post<RecipeNameIsExistResponseModel>(requestUrl, requestModel);
  }
}
