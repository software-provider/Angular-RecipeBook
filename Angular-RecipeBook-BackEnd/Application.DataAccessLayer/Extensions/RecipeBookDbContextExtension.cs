using System;
using System.Threading.Tasks;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.DataMigration;
using Application.DataAccessLayer.DataMigration.Interfaces;
using Application.DataAccessLayer.Entities;
using Application.DataAccessLayer.Extensions.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.DataAccessLayer.Extensions
{
    public static class RecipeBookDbContextExtension
    {
        public static async Task InitDatabase(this RecipeBookDbContext context, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            await context.Database.MigrateAsync();

            await Seed(context, userManager, roleManager);
        }

        private static async Task Seed(RecipeBookDbContext context, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            Type[] migrationTypes = MigrationHelper.GetMigrationTypes();

            IRoleDataMigration addDefaultRolesMigration = MigrationHelper.GetMigration<AddDefaultRolesMigration>(migrationTypes);
            await addDefaultRolesMigration.SeedAsync(context, roleManager);

            IUserDataMigration createAdminUserDataMigration = MigrationHelper.GetMigration<CreateTechAdminUserMigration>(migrationTypes);
            await createAdminUserDataMigration.SeedAsync(context, userManager);
        }
    }
}
