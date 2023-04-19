import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { RecipeHttpService } from './recipe-http.service';
import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';
import { LoadingSpinnerService } from 'src/app/shared/utilities/loading-spinner/services/loading-spinner.service';

import { RecipeModel } from '../models/recipe.model';
import { RecipeListItemModel } from '../models/recipe-list-item.model';
import { RecipeIngredientListItemModel } from '../models/recipe-ingredient-list-item.model';
import { CreateRecipeRequestModel } from '../models/request-models/create-recipe-request.model';
import { UpdateRecipeRequestModel } from '../models/request-models/update-recipe-request.model';
import { DeleteRecipeRequestModel } from '../models/request-models/delete-recipe-request.model';
import { GetAllRecipeResponseModel } from '../models/response-models/get-all-recipe-response.model';
import { GetRecipeByIdRequestModel } from '../models/request-models/get-recipe-by-id-request.model';
import { GetRecipeByIdResponseModel } from '../models/response-models/get-recipe-by-id-response.model';
import { GetAllRecipeListItemResponseModel } from '../models/response-models/get-all-recipe-list-item-response.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipe = new BehaviorSubject<RecipeModel>(null);
  private recipeListItems = new BehaviorSubject<RecipeListItemModel[]>(null);

  private recipeItemCreated = new Subject();
  private recipeItemUpdated = new Subject();
  private recipeItemDeleted = new Subject();

  public constructor(
    private recipeHttpService: RecipeHttpService,
    private shoppingListService: ShoppingListService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  //#region GETTERS

  public get recipe$(): Observable<RecipeModel> {
    return this.recipe.asObservable();
  }

  public get recipeListItems$(): Observable<RecipeListItemModel[]> {
    return this.recipeListItems.asObservable();
  }

  public get recipeItemCreated$(): Observable<Object> {
    return this.recipeItemCreated.asObservable();
  }

  public get recipeItemUpdated$(): Observable<Object> {
    return this.recipeItemUpdated.asObservable();
  }

  public get recipeItemDeleted$(): Observable<Object> {
    return this.recipeItemDeleted.asObservable();
  }

  //#endregion

  public refreshRecipeItems(): void {
    this.loadingSpinnerService.show('Loading recipes...');

    this.recipeHttpService
      .getAllRecipe()
      .pipe(
        map((response: GetAllRecipeResponseModel) => {
          return response.recipes.map(
            (listItem: GetAllRecipeListItemResponseModel) =>
              ({
                id: listItem.id,
                name: listItem.name,
                description: listItem.description,
                imagePath: listItem.imagePath,
              } as RecipeListItemModel)
          );
        }),
        finalize(() => this.loadingSpinnerService.hide())
      )
      .subscribe((resposne: RecipeListItemModel[]) => {
        this.recipeListItems.next(resposne);
      });
  }

  public getRecipeById(requestModel: GetRecipeByIdRequestModel): void {
    this.loadingSpinnerService.show('Loading recipe...');

    this.recipeHttpService
      .getRecipeById(requestModel)
      .pipe(
        map((response: GetRecipeByIdResponseModel) => {
          return {
            id: response.id,
            name: response.name,
            description: response.description,
            imagePath: response.imagePath,
            ingredients: response.ingredients.map(
              item => ({ name: item.name, amount: item.amount } as RecipeIngredientListItemModel)
            ),
          } as RecipeModel;
        }),
        finalize(() => this.loadingSpinnerService.hide())
      )
      .subscribe((recipe: RecipeModel) => {
        this.recipe.next(recipe);
      });
  }

  public createRecipe(requestModel: CreateRecipeRequestModel): void {
    this.loadingSpinnerService.show('Saving recipe...');

    this.recipeHttpService
      .createNewRecipe(requestModel)
      .pipe(finalize(() => this.loadingSpinnerService.hide()))
      .subscribe(() => {
        this.refreshRecipeItems();

        this.recipeItemCreated.next();
      });
  }

  public updateRecipe(requestModel: UpdateRecipeRequestModel): void {
    this.loadingSpinnerService.show('Update recipe...');

    this.recipeHttpService
      .updateRecipe(requestModel)
      .pipe(finalize(() => this.loadingSpinnerService.hide()))
      .subscribe(() => {
        this.refreshRecipeItems();

        this.recipeItemUpdated.next();
      });
  }

  public deleteRecipe(requestModel: DeleteRecipeRequestModel): void {
    this.loadingSpinnerService.show('Delete recipe...');

    this.recipeHttpService
      .deleteRecipe(requestModel)
      .pipe(finalize(() => this.loadingSpinnerService.hide()))
      .subscribe(() => {
        this.refreshRecipeItems();

        this.recipeItemDeleted.next();
      });
  }

  public addRecipeIngredientsToShoppingList(ingredients: RecipeIngredientListItemModel[]): void {
    this.shoppingListService.addRecipeIngredientsToShoppingList(ingredients);
  }
}
