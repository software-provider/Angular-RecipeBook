using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.Authentication.RequestModels;
using Application.Core.Exceptions;
using Application.Core.Exceptions.Enums;
using Application.Core.Structs;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.Authentication.Commands
{
    public class SignInCommand : IRequest<Result>
    {
        public string UserName { get; }

        public string Password { get; }

        public bool IsPersistent { get; }

        public SignInCommand(SignInRequestModel requestModel)
        {
            UserName = requestModel.UserName.ToUpper();
            Password = requestModel.Password;
            IsPersistent = requestModel.IsPersistent.Value;
        }
    }

    public class SignInCommandHandler : CommandBase<SignInCommand, Result>
    {
        private readonly SignInManager<ApplicationUser> _signInManager;

        public SignInCommandHandler(RecipeBookDbContext context, SignInManager<ApplicationUser> signInManager) : base(context)
        {
            _signInManager = signInManager;
        }

        public override async Task<Result> Handle(SignInCommand request, CancellationToken cancellationToken)
        {
            ApplicationUser user = await Context.Users
                .AsNoTracking()
                .Where(x => x.NormalizedUserName == request.UserName)
                .Where(x => x.IsActive)
                .FirstOrDefaultAsync(cancellationToken);

            if (user == null)
            {
                throw new ApiException(ApiExceptionCode.SignInUserNotFound,
                    $"User not found in database! {nameof(user.NormalizedUserName)}: {request.UserName}");
            }

            SignInResult signInResult = await _signInManager.PasswordSignInAsync(request.UserName, request.Password, request.IsPersistent, false);

            if (signInResult.IsLockedOut)
            {
                throw new ApiException(ApiExceptionCode.UserIsLockedOut, $"User is locked out! {nameof(user.NormalizedUserName)}: {user.UserName}");
            }

            if (signInResult.IsNotAllowed)
            {
                throw new ApiException(ApiExceptionCode.UserIsNotAllowed, $"User is not allowed! {nameof(user.NormalizedUserName)}: {user.UserName}");
            }

            if (!signInResult.Succeeded)
            {
                throw new ApiException(ApiExceptionCode.LoginFailed, $"The user failed to log in! {nameof(user.NormalizedUserName)} {user.UserName}");
            }

            return Result.Success();
        }
    }
}
