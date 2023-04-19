using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class RecipeNameIsExistRequestModel
    {
        public int? RecipeId { get; init; }

        [Required(ErrorMessage = "The Recipe Name must be required!")]
        public string RecipeName { get; init; }
    }
}
