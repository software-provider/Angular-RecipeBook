using System.Collections.Generic;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos.Services.RecipeIngredientService;
using Application.DataAccessLayer.Entities;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Interfaces
{
    public interface IRecipeIngredientService
    {
        Task<ICollection<RecipeIngredient>> InitialNewRecipeIngredients(InitialNewRecipeIngredientsDto modelDto);
    }
}
