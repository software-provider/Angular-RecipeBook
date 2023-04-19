using System.Collections.Generic;
using System.Threading;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos.Services.SaveShoppingListService
{
    public class InitialNewShoppingListIngredientsDto
    {
        public IEnumerable<ShoppingListIngredientListItemDto> Ingredients { get; init; }

        public CancellationToken CancellationToken { get; init; }
    }
}
