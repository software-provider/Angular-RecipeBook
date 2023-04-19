using System.Linq;
using System.Threading.Tasks;
using Application.Core.Extensions;
using Application.Core.Roles.Enums;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.DataMigration.Constants;
using Application.DataAccessLayer.DataMigration.Interfaces;
using Application.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.DataAccessLayer.DataMigration
{
    public class CreateTechAdminUserMigration : IUserDataMigration
    {
        public async Task SeedAsync(RecipeBookDbContext context, UserManager<ApplicationUser> userManager)
        {
            if (!context.Users.Any(x => x.NormalizedUserName == CreateTechAdminUserMigrationConstants.USERNAME.ToUpper()))
            {
                ApplicationUser adminUser = new ApplicationUser
                {
                    FirstName = CreateTechAdminUserMigrationConstants.FIRST_NAME,
                    LastName = CreateTechAdminUserMigrationConstants.LAST_NAME,
                    Email = CreateTechAdminUserMigrationConstants.EMAIL,
                    UserName = CreateTechAdminUserMigrationConstants.USERNAME,
                    EmailConfirmed = true,
                    LockoutEnabled = false,
                    IsActive = true
                };

                IdentityResult createdUserResult = await userManager.CreateAsync(adminUser, CreateTechAdminUserMigrationConstants.PASSWORD);

                if (createdUserResult.Succeeded)
                {
                    foreach (RoleType roleType in CreateTechAdminUserMigrationConstants.ROLES)
                    {
                        await userManager.AddToRoleAsync(adminUser, roleType.ToDisplayName());
                    }
                }
            }
        }
    }
}
