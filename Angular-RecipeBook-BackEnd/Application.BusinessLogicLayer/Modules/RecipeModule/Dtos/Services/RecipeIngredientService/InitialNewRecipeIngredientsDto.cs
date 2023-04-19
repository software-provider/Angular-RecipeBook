using System.Collections.Generic;
using System.Threading;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Dtos.Services.RecipeIngredientService
{
    public class InitialNewRecipeIngredientsDto
    {
        public List<RecipeIngredientListItemDto> Ingredients { get; init; }

        public CancellationToken CancellationToken { get; init; }
    }
}
