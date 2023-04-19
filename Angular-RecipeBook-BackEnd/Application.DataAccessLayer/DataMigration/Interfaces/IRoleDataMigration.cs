using System.Threading.Tasks;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.DataAccessLayer.DataMigration.Interfaces
{
    public interface IRoleDataMigration : IBaseMigration
    {
        Task SeedAsync(RecipeBookDbContext context, RoleManager<ApplicationRole> roleManager);
    }
}
