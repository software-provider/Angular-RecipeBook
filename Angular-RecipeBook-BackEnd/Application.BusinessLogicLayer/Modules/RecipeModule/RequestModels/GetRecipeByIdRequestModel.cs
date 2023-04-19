using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class GetRecipeByIdRequestModel
    {
        [Required(ErrorMessage = "The Recipe ID is required!")]
        public int Id { get; init; }
    }
}
