import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { RecipeService } from '../../../services/recipe.service';
import { RecipeListItemModel } from '../../../models/recipe-list-item.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public recipeListItems: RecipeListItemModel[];

  public constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.recipeService.recipeListItems$.subscribe((recipeListItems: RecipeListItemModel[]) => {
        this.recipeListItems = recipeListItems;
      })
    );

    this.recipeService.refreshRecipeItems();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onCreateRecipe(): void {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
