import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ShoppingListHttpService } from './shopping-list-http.service';
import { RibbonToastrService } from 'src/app/shared/utilities/ribbon-toastr/services/ribbon-toastr.service';
import { LoadingSpinnerService } from 'src/app/shared/utilities/loading-spinner/services/loading-spinner.service';

import { ShoppingListModel } from '../models/shopping-list.model';
import { ShoppingListIngredientModel } from '../models/shopping-list-ingredient.model';
import { RecipeIngredientListItemModel } from '../../recipe/models/recipe-ingredient-list-item.model';
import { SaveShoppingListRequestModel } from '../models/request-models/save-shopping-list-request.model';
import { GetLastSavedShoppingListResponseModel } from '../models/response-models/get-last-saved-shopping-list-response.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private shoppingList: ShoppingListModel;

  private shoppingListIngredient = new BehaviorSubject<ShoppingListIngredientModel>(null);
  private shoppingListIngredients = new BehaviorSubject<ShoppingListIngredientModel[]>(null);
  private shoppingListIngredientFormClear = new Subject();

  constructor(
    private ribbonToastrService: RibbonToastrService,
    private loadingSpinnerService: LoadingSpinnerService,
    private shoppingListHttpService: ShoppingListHttpService
  ) {
    this.shoppingList = { ingredients: [] } as ShoppingListModel;
  }

  //#region GETTERS

  public get shoppingListIngredient$(): Observable<ShoppingListIngredientModel> {
    return this.shoppingListIngredient.asObservable();
  }

  public get shoppingListIngredients$(): Observable<ShoppingListIngredientModel[]> {
    return this.shoppingListIngredients.asObservable();
  }

  public get shoppingListIngredientFormClear$(): Observable<Object> {
    return this.shoppingListIngredientFormClear.asObservable();
  }

  //#endregion

  public addRecipeIngredientsToShoppingList(recipeIngredients: RecipeIngredientListItemModel[]): void {
    recipeIngredients.forEach(item => {
      this.addNewShoppingListIngredientToShoppingList({
        name: item.name,
        amount: item.amount,
      } as ShoppingListIngredientModel);
    });

    this.ribbonToastrService.success('This recipe ingredients successfully added to your shopping list!');

    this.shoppingListIngredients.next(this.shoppingList.ingredients);
  }

  public getShoppingListIngredients(): ShoppingListIngredientModel[] {
    return this.shoppingList.ingredients;
  }

  public getShoppingListIngredientByIndex(index: number): void {
    const selectedItem: ShoppingListIngredientModel = this.shoppingList.ingredients[index];

    this.shoppingListIngredient.next(selectedItem);
  }

  public addShoppingListIngredientToShoppingList(shoppingListIngredient: ShoppingListIngredientModel): void {
    this.addNewShoppingListIngredientToShoppingList(shoppingListIngredient);

    this.shoppingListIngredients.next(this.shoppingList.ingredients);
  }

  public updateShoppingListIngredientInShoppingList(shoppingListIngredient: ShoppingListIngredientModel): void {
    const existingIngredientIndex = this.getShoppingListIngredientIndexByName(shoppingListIngredient.name);

    if (existingIngredientIndex !== -1) {
      if (existingIngredientIndex !== shoppingListIngredient.arrayIndex) {
        this.shoppingList.ingredients[existingIngredientIndex].amount += shoppingListIngredient.amount;
        this.shoppingList.ingredients.splice(shoppingListIngredient.arrayIndex, 1);

        this.reIndexShoppingListIngredientsArray();
      } else {
        this.shoppingList.ingredients[existingIngredientIndex].amount = shoppingListIngredient.amount;
      }
    } else {
      this.shoppingList.ingredients[shoppingListIngredient.arrayIndex] = shoppingListIngredient;
    }

    this.shoppingListIngredients.next(this.shoppingList.ingredients);
  }

  public deleteIngredientFromShoppingList(arrayIndex: number): void {
    this.shoppingList.ingredients.splice(arrayIndex, 1);

    this.reIndexShoppingListIngredientsArray();

    this.shoppingListIngredients.next(this.shoppingList.ingredients);
  }

  public clearingShoppingListIngredients(): void {
    this.shoppingList.ingredients = [];

    this.shoppingListIngredientFormClear.next();
    this.shoppingListIngredients.next(this.shoppingList.ingredients);
  }

  public getLastSavedShoppingList() {
    this.loadingSpinnerService.show('Fetching shopping list...');

    this.shoppingListHttpService
      .getLastSavedShoppingList()
      .pipe(
        map((response: GetLastSavedShoppingListResponseModel) => {
          const shoppingList: ShoppingListModel = {} as ShoppingListModel;
          shoppingList.ingredients = response.ingredients.map(
            (item, index) =>
              ({
                arrayIndex: index,
                name: item.name,
                amount: item.amount,
              } as ShoppingListIngredientModel)
          );

          return shoppingList;
        }),
        finalize(() => this.loadingSpinnerService.hide())
      )
      .subscribe((response: ShoppingListModel) => {
        this.shoppingList.ingredients = response.ingredients;

        this.ribbonToastrService.success('The shopping list was fetch successfully!');

        this.shoppingListIngredients.next(this.shoppingList.ingredients);
      });
  }

  public saveShoppingList(): void {
    const requestModel: SaveShoppingListRequestModel = {
      ingredients: this.shoppingList.ingredients,
    } as SaveShoppingListRequestModel;

    this.loadingSpinnerService.show('Saving shopping list...');

    this.shoppingListHttpService
      .saveShoppingList(requestModel)
      .pipe(finalize(() => this.loadingSpinnerService.hide()))
      .subscribe(() => {
        this.ribbonToastrService.success('Shopping list saved successfully!');
      });
  }

  //#region PRIVATE Helper Methods

  private addNewShoppingListIngredientToShoppingList(newShoppingListIngredient: ShoppingListIngredientModel): void {
    const existingIngredientIndex = this.getShoppingListIngredientIndexByName(newShoppingListIngredient.name);

    if (existingIngredientIndex !== -1) {
      this.shoppingList.ingredients[existingIngredientIndex].amount += newShoppingListIngredient.amount;
    } else {
      newShoppingListIngredient.arrayIndex = this.shoppingList.ingredients.length;

      this.shoppingList.ingredients.push(newShoppingListIngredient);
    }
  }

  private reIndexShoppingListIngredientsArray(): void {
    this.shoppingList.ingredients = this.shoppingList.ingredients.map((item, index) => {
      return { arrayIndex: index, name: item.name, amount: item.amount } as ShoppingListIngredientModel;
    });
  }

  private getShoppingListIngredientIndexByName(name: string): number {
    return this.shoppingList.ingredients.findIndex(x => x.name.toLowerCase() === name.trim().toLowerCase());
  }

  //#endregion
}
