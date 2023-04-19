using System.Collections.Generic;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos.Services.SaveShoppingListService;
using Application.DataAccessLayer.Entities;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Interfaces
{
    public interface ISaveShoppingListService
    {
        Task<ICollection<ShoppingList>> InitialNewShoppingListIngredients(InitialNewShoppingListIngredientsDto modelDto);
    }
}
