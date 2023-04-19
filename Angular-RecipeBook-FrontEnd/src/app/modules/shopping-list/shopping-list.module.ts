import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './container/shopping-list.component';
import { ShoppingListIngredientEditComponent } from './container/components/create-or-edit-shopping-list-ingredient/create-or-edit-shopping-list-ingredient.component';
import { ShoppingListIngredientListComponent } from './container/components/shopping-list-ingredient-list/shopping-list-ingredient-list.component';
import { ShoppingListIngredientItemComponent } from './container/components/shopping-list-ingredient-list/shopping-list-ingredient-item/shopping-ilst-ingredient-item.component';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListIngredientEditComponent,
    ShoppingListIngredientListComponent,
    ShoppingListIngredientItemComponent,
  ],
  imports: [ShoppingListRoutingModule, SharedModule],
})
export class ShoppingListModule {}
