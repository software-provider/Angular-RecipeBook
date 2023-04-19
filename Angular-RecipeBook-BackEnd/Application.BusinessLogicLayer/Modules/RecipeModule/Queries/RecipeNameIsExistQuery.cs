using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos.Services.RecipeValidatorService;
using Application.BusinessLogicLayer.Modules.RecipeModule.Interfaces;
using Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels;
using Application.BusinessLogicLayer.Modules.RecipeModule.ResponseModels;
using Application.DataAccessLayer.Context;
using MediatR;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Queries
{
    public class RecipeNameIsExistQuery : IRequest<RecipeNameIsExistResponseModel>
    {
        public int? RecipeId { get; }

        public string RecipeName { get; }

        public RecipeNameIsExistQuery(RecipeNameIsExistRequestModel requestModel)
        {
            RecipeId = requestModel.RecipeId;
            RecipeName = requestModel.RecipeName.Trim().ToLower();
        }
    }

    public class RecipeNameIsExistQueryHandler : QueryBase<RecipeNameIsExistQuery, RecipeNameIsExistResponseModel>
    {
        private readonly IRecipeValidatorService _recipeValidatorService;

        public RecipeNameIsExistQueryHandler(RecipeBookReadOnlyDbContext context, IRecipeValidatorService recipeValidatorService) : base(context)
        {
            _recipeValidatorService = recipeValidatorService;
        }

        public override async Task<RecipeNameIsExistResponseModel> Handle(RecipeNameIsExistQuery request, CancellationToken cancellationToken)
        {
            RecipeNameIsExistResponseModel responseModel = new RecipeNameIsExistResponseModel();

            RecipeNameIsExistValidationDto recipeNameIsExistValidationDto = new RecipeNameIsExistValidationDto
            {
                RecipeId = request.RecipeId,
                RecipeName = request.RecipeName.Trim().ToLower(),
                CancellationToken = cancellationToken
            };

            responseModel.RecipeNameIsExist = await _recipeValidatorService.RecipeNameIsExist(recipeNameIsExistValidationDto);

            return responseModel;
        }
    }
}
