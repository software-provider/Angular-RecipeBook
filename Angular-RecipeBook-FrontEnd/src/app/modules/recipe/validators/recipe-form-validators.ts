import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FormControl, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

import { RecipeHttpService } from '../services/recipe-http.service';

import { RecipeNameIsExistRequestModel } from '../models/request-models/recipe-name-is-exist-request.model';

@Injectable()
export class RecipeFormValidator {
  constructor(private recipeHttpService: RecipeHttpService) {}

  public maxIngredientAmountValueValidator(control: FormControl): { [s: string]: boolean } {
    const amountValue: any = control.value;

    if (amountValue !== null && +amountValue > 999999) {
      return { notValidMaxAmountValue: true };
    }

    return null;
  }

  public recipeNameValidator(recipeIdControl?: AbstractControl): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const requestModel: RecipeNameIsExistRequestModel = {
        recipeName: control.value,
        recipeId: recipeIdControl?.value,
      } as RecipeNameIsExistRequestModel;

      return this.recipeHttpService.checkRecipeNameIsExist(requestModel).pipe(
        map(response => {
          if (response.recipeNameIsExist) {
            return { recipeNameIsExist: true };
          }

          return null;
        })
      );
    };
  }
}
