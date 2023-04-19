import { RecipeIngredientListItemModel } from './recipe-ingredient-list-item.model';

export interface RecipeModel {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  ingredients: RecipeIngredientListItemModel[];
}
