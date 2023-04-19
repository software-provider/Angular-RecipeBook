using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos.Services.RecipeValidatorService;
using Application.BusinessLogicLayer.Modules.RecipeModule.Interfaces;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Services
{
    public class RecipeValidatorService : IRecipeValidatorService
    {
        private readonly RecipeBookReadOnlyDbContext _context;

        public RecipeValidatorService(RecipeBookReadOnlyDbContext context)
        {
            _context = context;
        }

        public async Task<bool> RecipeNameIsExist(RecipeNameIsExistValidationDto dtoModel)
        {
            if (dtoModel.RecipeId.HasValue)
            {
                Recipe existingRecipe = await _context.Recipes.FirstAsync(x => x.RecipeId == dtoModel.RecipeId, dtoModel.CancellationToken);

                if (existingRecipe.Name.ToLower() == dtoModel.RecipeName)
                {
                    return false;
                }
            }

            return await _context.Recipes.AnyAsync(x => x.Name.ToLower() == dtoModel.RecipeName, dtoModel.CancellationToken);
        }
    }
}
