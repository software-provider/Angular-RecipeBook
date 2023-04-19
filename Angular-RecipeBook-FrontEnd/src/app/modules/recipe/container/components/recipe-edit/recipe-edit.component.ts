import { Subscription } from 'rxjs/internal/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

import { RecipeService } from '../../../services/recipe.service';
import { RecipeFormValidator } from '../../../validators/recipe-form-validators';

import { RecipeModel } from '../../../models/recipe.model';
import { RecipeIngredientListItemModel } from '../../../models/recipe-ingredient-list-item.model';
import { UpdateRecipeRequestModel } from '../../../models/request-models/update-recipe-request.model';
import { GetRecipeByIdRequestModel } from '../../../models/request-models/get-recipe-by-id-request.model';
import { UpdateRecipeIngredientListItemRequestModel } from '../../../models/request-models/update-recipe-ingredient-list-item-request.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  providers: [RecipeFormValidator],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public recipeForm: FormGroup;

  //#region GETTERS

  public recipeId(): AbstractControl {
    return this.recipeForm.get('id');
  }

  public recipeName(): AbstractControl {
    return this.recipeForm.get('name');
  }

  public recipeImgPath(): AbstractControl {
    return this.recipeForm.get('imagePath');
  }

  public recipeDescription(): AbstractControl {
    return this.recipeForm.get('description');
  }

  public get ingredients(): FormArray {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  public ingredientName(index: number): AbstractControl {
    return this.ingredients.at(index).get('name');
  }

  public ingredientAmount(index: number): AbstractControl {
    return this.ingredients.at(index).get('amount');
  }

  //#endregion

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private recipeFormValidator: RecipeFormValidator
  ) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        const requestModel: GetRecipeByIdRequestModel = { id: +params['id'] } as GetRecipeByIdRequestModel;

        this.recipeService.getRecipeById(requestModel);
      }),
      this.recipeService.recipe$.subscribe((recipe: RecipeModel) => {
        this.recipeForm = new FormGroup({
          id: new FormControl(recipe.id),
          name: new FormControl(recipe.name, [Validators.required]),
          imagePath: new FormControl(recipe.imagePath, [Validators.required]),
          description: new FormControl(recipe.description, [Validators.required]),
          ingredients: this.initRecipeIngredientsFormArray(recipe.ingredients),
        });

        this.recipeName().setAsyncValidators(this.recipeFormValidator.recipeNameValidator(this.recipeId()));
      }),
      this.recipeService.recipeItemUpdated$.subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onAddNewRecipeIngredient(): void {
    this.ingredients.push(this.createNewRecipeIngredientFormGroup());
  }

  public onDeleteRecipeIngredient(index: number): void {
    if (index !== null && index !== undefined && index >= 0) {
      this.ingredients.removeAt(index);
    }
  }

  public onUpdateRecipe(): void {
    const requestModel: UpdateRecipeRequestModel = {
      id: this.recipeId().value,
      name: this.recipeName().value,
      description: this.recipeDescription().value,
      imagePath: this.recipeImgPath().value,
      ingredients: this.ingredients.controls.map(
        item =>
          ({
            name: item.get('name').value,
            amount: item.get('amount').value,
          } as UpdateRecipeIngredientListItemRequestModel)
      ),
    } as UpdateRecipeRequestModel;

    this.recipeService.updateRecipe(requestModel);
  }

  public onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // #region PRIVATE Helper Methods

  private initRecipeIngredientsFormArray(recipeIngredients: RecipeIngredientListItemModel[]): FormArray {
    const recipeIngredientsFormArray: FormArray = new FormArray([]);

    for (const ingredientItem of recipeIngredients) {
      recipeIngredientsFormArray.push(this.createNewRecipeIngredientFormGroup(ingredientItem));
    }

    return recipeIngredientsFormArray;
  }

  private createNewRecipeIngredientFormGroup(recipeIngredient?: RecipeIngredientListItemModel): FormGroup {
    return new FormGroup({
      name: new FormControl(recipeIngredient?.name, Validators.required),
      amount: new FormControl(recipeIngredient?.amount, [
        Validators.required,
        this.recipeFormValidator.maxIngredientAmountValueValidator,
      ]),
    });
  }

  // #endregion
}
