import { UpdateRecipeIngredientListItemRequestModel } from './update-recipe-ingredient-list-item-request.model';

export interface UpdateRecipeRequestModel {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  ingredients: UpdateRecipeIngredientListItemRequestModel[];
}
