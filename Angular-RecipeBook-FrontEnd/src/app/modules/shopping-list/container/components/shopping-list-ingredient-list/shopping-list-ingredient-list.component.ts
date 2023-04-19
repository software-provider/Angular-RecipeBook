import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ShoppingListService } from '../../../services/shopping-list.service';
import { ShoppingListIngredientModel } from '../../../models/shopping-list-ingredient.model';

@Component({
  selector: 'shopping-list-ingredient-list',
  templateUrl: './shopping-list-ingredient-list.component.html',
  styleUrls: ['./shopping-list-ingredient-list.component.scss'],
})
export class ShoppingListIngredientListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public shoppingListIngredients: ShoppingListIngredientModel[];

  constructor(private shoppingListService: ShoppingListService) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.shoppingListService.shoppingListIngredients$.subscribe(
        (shoppingListIngredients: ShoppingListIngredientModel[]) => {
          this.shoppingListIngredients = shoppingListIngredients;
        }
      )
    );

    this.shoppingListIngredients = this.shoppingListService.getShoppingListIngredients();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onClearingShoppingListIngredients(): void {
    this.shoppingListService.clearingShoppingListIngredients();
  }

  public onFetchLastSavedShoppingList(): void {
    this.shoppingListService.getLastSavedShoppingList();
  }

  public onSaveShoppingList(): void {
    this.shoppingListService.saveShoppingList();
  }
}
