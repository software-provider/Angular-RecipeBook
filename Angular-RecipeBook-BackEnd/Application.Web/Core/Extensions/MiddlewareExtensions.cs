using Application.Web.Core.Middlewares;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace Application.Web.Core.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder AddApiExceptionHandler(this IApplicationBuilder app)
        {
            app.UseWhen(ctx => ctx.Request.Path.HasValue && ctx.Request.Path.StartsWithSegments(new PathString("/api")),
                x => x.UseMiddleware<ApiExceptionHandlerMiddleware>());

            return app;
        }
    }
}
