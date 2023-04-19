import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { ShoppingListService } from '../../../services/shopping-list.service';
import { ShoppingListIngredientFormValidator } from '../../../validators/shopping-list-ingredient-form-validators';

import { ShoppingListIngredientModel } from '../../../models/shopping-list-ingredient.model';

@Component({
  selector: 'create-or-edit-shopping-list-ingredient',
  templateUrl: './create-or-edit-shopping-list-ingredient.component.html',
  styleUrls: ['./create-or-edit-shopping-list-ingredient.component.scss'],
})
export class ShoppingListIngredientEditComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public shoppingListIngredientForm: FormGroup;

  //#region GETTERS

  public ingredientArrayIndex(): AbstractControl {
    return this.shoppingListIngredientForm.get('arrayIndex');
  }

  public ingredientName(): AbstractControl {
    return this.shoppingListIngredientForm.get('name');
  }

  public ingredientAmount(): AbstractControl {
    return this.shoppingListIngredientForm.get('amount');
  }

  //#endregion

  constructor(private shoppingListService: ShoppingListService) {}

  public ngOnInit(): void {
    this.shoppingListIngredientForm = new FormGroup({
      arrayIndex: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, ShoppingListIngredientFormValidator.amountValidator]),
    });

    this.subscriptions.push(
      this.shoppingListService.shoppingListIngredient$.subscribe((response: ShoppingListIngredientModel) => {
        if (response) {
          this.shoppingListIngredientForm.setValue({
            arrayIndex: response.arrayIndex,
            name: response.name,
            amount: response.amount,
          });
        }
      }),

      this.shoppingListService.shoppingListIngredientFormClear$.subscribe(() => {
        this.onClear();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onCreateOrEditItem(): void {
    const shoppingListIngredient: ShoppingListIngredientModel = {
      arrayIndex: this.ingredientArrayIndex().value,
      name: this.ingredientName().value,
      amount: this.ingredientAmount().value,
    } as ShoppingListIngredientModel;

    if (shoppingListIngredient.arrayIndex !== null) {
      this.shoppingListService.updateShoppingListIngredientInShoppingList(shoppingListIngredient);
    } else {
      this.shoppingListService.addShoppingListIngredientToShoppingList(shoppingListIngredient);
    }

    this.onClear();
  }

  public onDelete(): void {
    this.shoppingListService.deleteIngredientFromShoppingList(this.ingredientArrayIndex().value);

    this.onClear();
  }

  public onClear(): void {
    this.shoppingListIngredientForm.reset();
  }
}
