using System.ComponentModel.DataAnnotations;
using Application.BusinessLogicLayer.Modules.RecipeModule.Constants;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class UpdateRecipeIngredientListItemRequestModel
    {
        [Required(ErrorMessage = "The Ingredient Name field must be required!")]
        public string Name { get; init; }

        [Range(RecipeModuleConstants.RangeValues.INGREDIENT_AMOUNT_MIN_VALUE, RecipeModuleConstants.RangeValues.INGREDIENT_AMOUNT_MAX_VALUE,
            ErrorMessage = "The Ingredient Amount value for {0} must be between {1} and {2}.")]
        public int Amount { get; init; }
    }
}
