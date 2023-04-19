using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels;
using Application.Core.Exceptions;
using Application.Core.Exceptions.Enums;
using Application.Core.Structs;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Commands
{
    public class DeleteRecipeCommand : IRequest<Result>
    {
        public int Id { get; }

        public DeleteRecipeCommand(DeleteRecipeRequestModel requestModel)
        {
            Id = requestModel.Id;
        }
    }

    public class DeleteRecipeCommandHandler : CommandBase<DeleteRecipeCommand, Result>
    {
        public DeleteRecipeCommandHandler(RecipeBookDbContext context) : base(context)
        { }

        public override async Task<Result> Handle(DeleteRecipeCommand request, CancellationToken cancellationToken)
        {
            Recipe recipe = Context.Recipe.FirstOrDefault(x => x.RecipeId == request.Id);

            if (recipe == null)
            {
                throw new ApiException(ApiExceptionCode.DeletableRecipeNotFound,
                    $"Deletable recipe not found in database! {nameof(recipe.RecipeId)}: {request.Id}");
            }

            Context.Recipe.Remove(recipe);

            await Context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
