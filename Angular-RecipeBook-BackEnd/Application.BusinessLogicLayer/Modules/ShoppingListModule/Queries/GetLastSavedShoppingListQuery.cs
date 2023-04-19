using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.ResponseModels;
using Application.Core.Exceptions;
using Application.Core.Exceptions.Enums;
using Application.Core.Services.Interfaces;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Queries
{
    public class GetLastSavedShoppingListQuery : IRequest<GetLastSavedShoppingListResponseModel>
    { }

    public class GetLastSavedShoppingListQueryHandler : QueryBase<GetLastSavedShoppingListQuery, GetLastSavedShoppingListResponseModel>
    {
        private readonly int _authorizedUserId;

        public GetLastSavedShoppingListQueryHandler(RecipeBookReadOnlyDbContext context, ICurrentUserService currentUserService) : base(context)
        {
            _authorizedUserId = currentUserService.GetAuthorizedUserId();
        }

        public override async Task<GetLastSavedShoppingListResponseModel> Handle(GetLastSavedShoppingListQuery request, CancellationToken cancellationToken)
        {
            GetLastSavedShoppingListResponseModel result = new GetLastSavedShoppingListResponseModel();

            ApplicationUser user = await Context.Users
                .Where(x => x.Id == _authorizedUserId)
                .FirstOrDefaultAsync(cancellationToken);

            if (user == null)
            {
                throw new ApiException(ApiExceptionCode.UserNotFound, $"User not found in database! {nameof(user.Id)}: {_authorizedUserId}");
            }

            result.Ingredients = await Context.ShoppingLists
                .Include(x => x.User)
                .Include(x => x.Ingredient)
                .Where(x => x.User == user)
                .Select(x => new GetLastSavedShoppingListIngredientListItemResponseModel
                {
                    Name = x.Ingredient.Name,
                    Amount = x.Amount
                }).ToListAsync(cancellationToken);

            return result;
        }
    }
}
