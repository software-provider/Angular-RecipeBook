import { Component, Input } from '@angular/core';

import { RecipeListItemModel } from 'src/app/modules/recipe/models/recipe-list-item.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent {
  @Input() recipeListItem: RecipeListItemModel;
  @Input() index: number;
}
