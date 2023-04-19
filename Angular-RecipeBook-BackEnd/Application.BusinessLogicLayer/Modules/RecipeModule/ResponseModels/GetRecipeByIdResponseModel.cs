using System.Collections.Generic;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.ResponseModels
{
    public class GetRecipeByIdResponseModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImagePath { get; set; }

        public List<GetRecipeByIdIngredientListItemResponseModel> Ingredients { get; set; }
    }
}
