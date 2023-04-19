using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class UpdateRecipeRequestModel
    {
        [Required(ErrorMessage = "The Recipe ID is required!")]
        public int Id { get; init; }

        [Required(ErrorMessage = "The Recipe Name field must be required!")]
        public string Name { get; init; }

        [Required(ErrorMessage = "The Descreption field must be required!")]
        public string Description { get; init; }

        [Required(ErrorMessage = "The Image Path field must be required!")]
        public string ImagePath { get; init; }

        public List<UpdateRecipeIngredientListItemRequestModel> Ingredients { get; init; }

        public UpdateRecipeRequestModel()
        {
            Ingredients = new List<UpdateRecipeIngredientListItemRequestModel>();
        }
    }
}
