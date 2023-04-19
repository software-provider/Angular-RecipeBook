using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos.Services.RecipeIngredientService;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos.Services.RecipeValidatorService;
using Application.BusinessLogicLayer.Modules.RecipeModule.Interfaces;
using Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels;
using Application.Core.Exceptions;
using Application.Core.Exceptions.Enums;
using Application.Core.Structs;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Commands
{
    public class CreateRecipeCommand : IRequest<Result>
    {
        public string Name { get; }

        public string Description { get; }

        public string ImagePath { get; }

        public List<RecipeIngredientListItemDto> Ingredients { get; }

        public CreateRecipeCommand(CreateRecipeRequestModel requestModel)
        {
            Name = requestModel.Name;
            Description = requestModel.Description;
            ImagePath = requestModel.ImagePath;
            Ingredients = requestModel.Ingredients?.Select(x => new RecipeIngredientListItemDto
            {
                Name = x.Name.Trim(),
                Amount = x.Amount
            }).ToList();
        }
    }

    public class CreateRecipeCommandHandler : CommandBase<CreateRecipeCommand, Result>
    {
        private readonly IRecipeValidatorService _recipeValidatorService;

        private readonly IRecipeIngredientService _recipeIngredientService;

        public CreateRecipeCommandHandler(RecipeBookDbContext context, IRecipeValidatorService recipeValidatorService, IRecipeIngredientService recipeIngredientService) : base(context)
        {
            _recipeValidatorService = recipeValidatorService;
            _recipeIngredientService = recipeIngredientService;
        }

        public override async Task<Result> Handle(CreateRecipeCommand request, CancellationToken cancellationToken)
        {
            RecipeNameIsExistValidationDto recipeNameIsExistValidationDto = new RecipeNameIsExistValidationDto
            {
                RecipeName = request.Name.Trim().ToLower(),
                CancellationToken = cancellationToken
            };

            if (await _recipeValidatorService.RecipeNameIsExist(recipeNameIsExistValidationDto))
            {
                throw new ApiException(ApiExceptionCode.RecipeNameIsAlreadyExist, $"Recipe name is exist! {nameof(request.Name)}: {request.Name}");
            }

            Recipe recipe = new Recipe
            {
                Name = request.Name,
                Description = request.Description,
                ImagePath = request.ImagePath,
                RecipeIngredients = await _recipeIngredientService.InitialNewRecipeIngredients(new InitialNewRecipeIngredientsDto
                {
                    Ingredients = request.Ingredients,
                    CancellationToken = cancellationToken
                }),
            };


            await Context.Recipe.AddAsync(recipe, cancellationToken);

            await Context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
