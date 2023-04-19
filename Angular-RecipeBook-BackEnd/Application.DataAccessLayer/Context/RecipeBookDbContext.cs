using Application.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Application.DataAccessLayer.Context
{
    public class RecipeBookDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public RecipeBookDbContext(DbContextOptions options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(RecipeBookDbContext).Assembly);
        }

        #region DbSets

        public DbSet<ApplicationLog> ApplicationLog { get; set; }

        public DbSet<Recipe> Recipe { get; set; }

        public DbSet<Ingredient> Ingredient { get; set; }

        public DbSet<RecipeIngredient> RecipeIngredient { get; set; }

        public DbSet<ShoppingList> ShoppingList { get; set; }

        #endregion
    }
}
