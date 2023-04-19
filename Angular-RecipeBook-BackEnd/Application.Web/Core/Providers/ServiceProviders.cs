using Application.BusinessLogicLayer.Modules.RecipeModule.Interfaces;
using Application.BusinessLogicLayer.Modules.RecipeModule.Services;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Interfaces;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Services;
using Application.Core.Services;
using Application.Core.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Web.Core.Providers
{
    public static class ServiceProviders
    {
        public static IServiceCollection AddScopedServices(this IServiceCollection services)
        {
            services.AddScoped<ISaveShoppingListService, SaveShoppingListService>();
            services.AddScoped<IRecipeValidatorService, RecipeValidatorService>();
            services.AddScoped<IRecipeIngredientService, RecipeIngredientService>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();

            return services;
        }
    }
}
