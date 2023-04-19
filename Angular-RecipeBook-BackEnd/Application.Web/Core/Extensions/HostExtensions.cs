using System;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using Application.DataAccessLayer.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Application.Web.Core.Extensions
{
    public static class HostExtensions
    {
        public static IHost MigrateDatabase(this IHost host)
        {
            using (IServiceScope scope = host.Services.CreateScope())
            {
                IServiceProvider serviceProvider = scope.ServiceProvider;

                RecipeBookDbContext context = serviceProvider.GetRequiredService<RecipeBookDbContext>();
                UserManager<ApplicationUser> userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                RoleManager<ApplicationRole> roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

                context.InitDatabase(userManager, roleManager).Wait();
            }

            return host;
        }
    }
}
