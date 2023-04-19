import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './container/recipe.component';
import { RecipeEditComponent } from './container/components/recipe-edit/recipe-edit.component';
import { RecipeCreateComponent } from './container/components/recipe-create/recipe-create.component';
import { RecipeDetailComponent } from './container/components/recipe-details/recipe-details.component';
import { DefaultRecipeComponent } from './container/components/default-recipe/default-recipe.component';

import { MODULE_NAMES } from './constants/module-names.constant';

import { RouterDataModel } from 'src/app/core/router/models/router-data.model';
import { HeaderTitleDataModel } from 'src/app/core/router/models/header-title-data.model';
import { BrowserTitleDataModel } from 'src/app/core/router/models/browser-title-data.model';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    data: {
      headerTitle: {
        mainTitle: MODULE_NAMES['LIST'],
        subTitle: MODULE_NAMES['MAIN'],
      } as HeaderTitleDataModel,
      browserTitle: { name: `${MODULE_NAMES['MAIN']} - ${MODULE_NAMES['LIST']}` } as BrowserTitleDataModel,
    } as RouterDataModel,
    children: [
      {
        path: '',
        component: DefaultRecipeComponent,
        data: {
          headerTitle: {
            mainTitle: MODULE_NAMES['LIST'],
            subTitle: MODULE_NAMES['MAIN'],
          } as HeaderTitleDataModel,
          browserTitle: { name: `${MODULE_NAMES['MAIN']} - ${MODULE_NAMES['LIST']}` } as BrowserTitleDataModel,
        } as RouterDataModel,
      },
      {
        path: 'create',
        component: RecipeCreateComponent,
        data: {
          headerTitle: {
            mainTitle: MODULE_NAMES['CREATE'],
            subTitle: MODULE_NAMES['MAIN'],
          } as HeaderTitleDataModel,
          browserTitle: { name: `${MODULE_NAMES['MAIN']} - ${MODULE_NAMES['CREATE']}` } as BrowserTitleDataModel,
        } as RouterDataModel,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        data: {
          headerTitle: {
            mainTitle: MODULE_NAMES['DETAILS'],
            subTitle: MODULE_NAMES['MAIN'],
          } as HeaderTitleDataModel,
          browserTitle: { name: `${MODULE_NAMES['MAIN']} - ${MODULE_NAMES['DETAILS']}` } as BrowserTitleDataModel,
        } as RouterDataModel,
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        data: {
          headerTitle: {
            mainTitle: MODULE_NAMES['EDIT'],
            subTitle: MODULE_NAMES['MAIN'],
          } as HeaderTitleDataModel,
          browserTitle: { name: `${MODULE_NAMES['MAIN']} - ${MODULE_NAMES['EDIT']}` } as BrowserTitleDataModel,
        } as RouterDataModel,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
