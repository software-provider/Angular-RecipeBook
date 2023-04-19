using System.Threading;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Dtos.Services.RecipeValidatorService
{
    public class RecipeNameIsExistValidationDto
    {
        public int? RecipeId { get; init; }

        public string RecipeName { get; init; }

        public CancellationToken CancellationToken { get; init; }
    }
}
