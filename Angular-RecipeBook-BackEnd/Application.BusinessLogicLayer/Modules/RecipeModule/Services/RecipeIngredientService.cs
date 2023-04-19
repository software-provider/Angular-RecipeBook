using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos.Services.RecipeIngredientService;
using Application.BusinessLogicLayer.Modules.RecipeModule.Interfaces;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Services
{
    public class RecipeIngredientService : IRecipeIngredientService
    {
        private readonly RecipeBookDbContext _context;

        public RecipeIngredientService(RecipeBookDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<RecipeIngredient>> InitialNewRecipeIngredients(InitialNewRecipeIngredientsDto modelDto)
        {
            List<RecipeIngredient> result = new List<RecipeIngredient>();

            List<Ingredient> existingIngredients = await GetExistingIngredients(modelDto.Ingredients, modelDto.CancellationToken);

            foreach (RecipeIngredientListItemDto newRecipeIngredient in modelDto.Ingredients)
            {
                Ingredient insertedIngredient = existingIngredients.FirstOrDefault(x => x.Name.ToLower() == newRecipeIngredient.Name.ToLower());

                if (insertedIngredient == null)
                {
                    insertedIngredient = (await _context.Ingredient.AddAsync(new Ingredient
                    {
                        Name = newRecipeIngredient.Name
                    }, modelDto.CancellationToken)).Entity;
                }

                result.Add(new RecipeIngredient
                {
                    Ingredient = insertedIngredient,
                    Amount = newRecipeIngredient.Amount
                });
            }

            return result.GroupBy(x => x.Ingredient)
                         .Select(x => new RecipeIngredient
                         {
                             Ingredient = x.Key,
                             Amount = x.Select(y => y.Amount).ToArray().Sum()
                         }).ToList();
        }

        private async Task<List<Ingredient>> GetExistingIngredients(IEnumerable<RecipeIngredientListItemDto> ingredients, CancellationToken cancellationToken)
        {
            IEnumerable<string> newIngredientNames = ingredients.Select(x => x.Name.ToLower());

            return await _context.Ingredient
                .Where(x => newIngredientNames.Contains(x.Name.ToLower()))
                .ToListAsync(cancellationToken);
        }
    }
}
