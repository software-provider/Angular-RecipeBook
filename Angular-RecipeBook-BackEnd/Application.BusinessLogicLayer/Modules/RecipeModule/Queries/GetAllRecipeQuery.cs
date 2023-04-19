using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.ResponseModels;
using Application.DataAccessLayer.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Queries
{
    public class GetAllRecipeQuery : IRequest<GetAllRecipeResponseModel>
    { }

    public class GetAllRecipeQueryHandler : QueryBase<GetAllRecipeQuery, GetAllRecipeResponseModel>
    {
        public GetAllRecipeQueryHandler(RecipeBookReadOnlyDbContext context) : base(context)
        { }

        public override async Task<GetAllRecipeResponseModel> Handle(GetAllRecipeQuery request, CancellationToken cancellationToken)
        {
            return new GetAllRecipeResponseModel
            {
                Recipes = await Context.Recipes.Select(x => new GetAllRecipeListItemResponseModel
                {
                    Id = x.RecipeId,
                    Name = x.Name,
                    Description = x.Description,
                    ImagePath = x.ImagePath
                }).ToListAsync(cancellationToken)
            };
        }
    }
}
