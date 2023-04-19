import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeRoutingModule } from './recipe-routing.module';

import { RecipesComponent } from './container/recipe.component';
import { RecipeListComponent } from './container/components/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './container/components/recipe-edit/recipe-edit.component';
import { RecipeCreateComponent } from './container/components/recipe-create/recipe-create.component';
import { RecipeDetailComponent } from './container/components/recipe-details/recipe-details.component';
import { DefaultRecipeComponent } from './container/components/default-recipe/default-recipe.component';
import { RecipeItemComponent } from './container/components/recipe-list/recipe-item/recipe-item.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    DefaultRecipeComponent,
    RecipeCreateComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
  ],
  imports: [RecipeRoutingModule, SharedModule],
})
export class RecipeModule {}
