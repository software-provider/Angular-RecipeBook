using System.Threading.Tasks;
using Application.Core.Extensions;
using Application.Core.Roles.Enums;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.DataMigration.Constants;
using Application.DataAccessLayer.DataMigration.Interfaces;
using Application.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.DataAccessLayer.DataMigration
{
    public class AddDefaultRolesMigration : IRoleDataMigration
    {
        public async Task SeedAsync(RecipeBookDbContext context, RoleManager<ApplicationRole> roleManager)
        {
            if (await context.Roles.AnyAsync())
            {
                return;
            }

            foreach (RoleType roleType in AddDefaultRolesMigrationConstants.DEFAULT_ROLES)
            {
                await AddNewRole(roleManager, roleType);
            }
        }

        private static async Task AddNewRole(RoleManager<ApplicationRole> roleManager, RoleType roleType)
        {
            ApplicationRole role = new ApplicationRole
            {
                Name = roleType.ToDisplayName()
            };

            await roleManager.CreateAsync(role);
        }
    }
}
