import { GetRecipeByIdIngredientListItemResponseModel } from './get-recipe-by-id-ingredient-list-item-response.model';

export interface GetRecipeByIdResponseModel {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  ingredients: GetRecipeByIdIngredientListItemResponseModel[];
}
