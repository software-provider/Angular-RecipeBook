using System.Security.Claims;
using Application.Core.Exceptions;
using Application.Core.Exceptions.Enums;
using Application.Core.Helpers;
using Application.Core.Services.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Application.Core.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly HttpContext _httpContext;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContext = httpContextAccessor.HttpContext;
        }

        public int GetAuthorizedUserId()
        {
            string userId = _httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ApiException(ApiExceptionCode.UnauthorizedUser, "The user performing the operation is unauthorized!");
            }

            int result = CurrentUserServiceHelper.UserIdParser(userId);

            return result;
        }
    }
}
