using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class CreateRecipeRequestModel
    {
        [Required(ErrorMessage = "The Recipe Name field must be required!")]
        public string Name { get; init; }

        [Required(ErrorMessage = "The Descreption field must be required!")]
        public string Description { get; init; }

        [Required(ErrorMessage = "The Image Path field must be required!")]
        public string ImagePath { get; init; }

        public List<CreateRecipeIngredientListItemRequestModel> Ingredients { get; init; }

        public CreateRecipeRequestModel()
        {
            Ingredients = new List<CreateRecipeIngredientListItemRequestModel>();
        }
    }
}
