using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Application.DataAccessLayer.Entities
{
    public class Ingredient
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public ICollection<RecipeIngredient> RecipeIngredients { get; set; }

        public ICollection<ShoppingList> ShoppingList { get; set; }

        public Ingredient()
        {
            RecipeIngredients = new HashSet<RecipeIngredient>();
            ShoppingList = new HashSet<ShoppingList>();
        }
    }

    public class IngredientEntityConfiguration : IEntityTypeConfiguration<Ingredient>
    {
        public void Configure(EntityTypeBuilder<Ingredient> builder)
        {
            builder.HasIndex(x => x.Name).IsUnique();
        }
    }
}
