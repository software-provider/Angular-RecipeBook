using System.Collections.Generic;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.ResponseModels
{
    public class GetLastSavedShoppingListResponseModel
    {
        public List<GetLastSavedShoppingListIngredientListItemResponseModel> Ingredients { get; set; }
    }
}
