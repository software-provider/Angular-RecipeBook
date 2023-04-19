using Application.BusinessLogicLayer.Interfaces;
using Application.DataAccessLayer.Context;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Web.Core.Configurations
{
    public static class CoreConfigurations
    {
        public static IServiceCollection ConfigureReadOnlyDbContext(this IServiceCollection services)
        {
            services.AddScoped<RecipeBookReadOnlyDbContext>();

            return services;
        }

        public static IServiceCollection ConfigureMediatR(this IServiceCollection services)
        {
            services.AddMediatR(typeof(IBusinessLogicLayerMarker));

            return services;
        }
    }
}
