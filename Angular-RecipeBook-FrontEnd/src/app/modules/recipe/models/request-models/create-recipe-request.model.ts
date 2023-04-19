import { CreateRecipeIngredientListItemRequestModel } from './create-recipe-ingredient-list-item-request.model';

export interface CreateRecipeRequestModel {
  name: string;
  description: string;
  imagePath: string;
  ingredients: CreateRecipeIngredientListItemRequestModel[];
}
