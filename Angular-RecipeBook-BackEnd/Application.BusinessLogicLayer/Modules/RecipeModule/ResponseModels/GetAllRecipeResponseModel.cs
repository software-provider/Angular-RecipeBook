using System.Collections.Generic;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.ResponseModels
{
    public class GetAllRecipeResponseModel
    {
        public List<GetAllRecipeListItemResponseModel> Recipes { get; set; }
    }
}
