using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.AuthorizedUser.ResponseModels;
using Application.Core.Exceptions;
using Application.Core.Exceptions.Enums;
using Application.Core.Services.Interfaces;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.AuthorizedUser.Queries
{
    public class GetAuthorizedUserDataQuery : IRequest<AuthorizedUserDataResponseModel>
    { }

    public class GetAuthorizedUserDataQueryHandler : QueryBase<GetAuthorizedUserDataQuery, AuthorizedUserDataResponseModel>
    {
        private readonly int _authorizedUserId;

        public GetAuthorizedUserDataQueryHandler(RecipeBookReadOnlyDbContext context, ICurrentUserService currentUserService) : base(context)
        {
            _authorizedUserId = currentUserService.GetAuthorizedUserId();
        }

        public override async Task<AuthorizedUserDataResponseModel> Handle(GetAuthorizedUserDataQuery request, CancellationToken cancellationToken)
        {
            ApplicationUser user = await Context.Users.FirstOrDefaultAsync(x => x.Id == _authorizedUserId, cancellationToken);

            if (user == null)
            {
                throw new ApiException(ApiExceptionCode.UserNotFound, $"User not found in database! {nameof(user.Id)}: {_authorizedUserId}");
            }

            return new AuthorizedUserDataResponseModel
            {
                UserName = user.UserName,
                UserFullName = $"{user.LastName} {user.FirstName}",
                EmailAddress = user.Email
            };
        }
    }
}
