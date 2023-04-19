using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class DeleteRecipeRequestModel
    {
        [Required(ErrorMessage = "The ID of the Recipe to be deleted is Required!")]
        public int Id { get; init; }
    }
}
