import { FormControl } from '@angular/forms';

export class ShoppingListIngredientFormValidator {
  public static amountValidator(control: FormControl): { [s: string]: boolean } {
    const regexp: RegExp = new RegExp('^[1-9]+[0-9]*$');

    if (control.value !== null && !regexp.test(control.value)) {
      return { notValidAmount: true };
    }

    return null;
  }
}
