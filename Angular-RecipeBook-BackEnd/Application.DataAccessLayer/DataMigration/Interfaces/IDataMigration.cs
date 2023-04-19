using System.Threading.Tasks;
using Application.DataAccessLayer.Context;

namespace Application.DataAccessLayer.DataMigration.Interfaces
{
    public interface IDataMigration : IBaseMigration
    {
        Task SeedAsync(RecipeBookDbContext context);
    }
}
