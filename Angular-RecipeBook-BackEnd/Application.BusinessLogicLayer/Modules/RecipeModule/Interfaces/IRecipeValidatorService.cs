using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos.Services.RecipeValidatorService;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Interfaces
{
    public interface IRecipeValidatorService
    {
        Task<bool> RecipeNameIsExist(RecipeNameIsExistValidationDto dtoModel);
    }
}
