using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos.Services.SaveShoppingListService;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Interfaces;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Services
{
    public class SaveShoppingListService : ISaveShoppingListService
    {
        private readonly RecipeBookDbContext _context;

        public SaveShoppingListService(RecipeBookDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<ShoppingList>> InitialNewShoppingListIngredients(InitialNewShoppingListIngredientsDto modelDto)
        {
            List<ShoppingList> result = new List<ShoppingList>();

            List<Ingredient> existingIngredients = await GetExistingIngredientsAsync(modelDto);

            foreach (ShoppingListIngredientListItemDto newShoppingListIngredient in modelDto.Ingredients)
            {
                Ingredient insertedIngredient =
                    existingIngredients.FirstOrDefault(x => x.Name.ToLower() == newShoppingListIngredient.Name.ToLower());

                if (insertedIngredient == null)
                {
                    insertedIngredient = (await _context.Ingredient.AddAsync(new Ingredient
                    {
                        Name = newShoppingListIngredient.Name
                    }, modelDto.CancellationToken)).Entity;
                }

                result.Add(new ShoppingList
                {
                    Ingredient = insertedIngredient,
                    Amount = newShoppingListIngredient.Amount
                });
            }

            return result.GroupBy(x => x.Ingredient)
                         .Select(x => new ShoppingList
                         {
                             Ingredient = x.Key,
                             Amount = x.Select(y => y.Amount).ToArray().Sum(),
                         }).ToList();
        }

        private async Task<List<Ingredient>> GetExistingIngredientsAsync(InitialNewShoppingListIngredientsDto modelDto)
        {
            IEnumerable<string> insertedIngredientNames = modelDto.Ingredients.Select(x => x.Name.ToLower());

            return await _context.Ingredient
                .Where(x => insertedIngredientNames.Contains(x.Name.ToLower()))
                .ToListAsync(modelDto.CancellationToken);
        }
    }
}
