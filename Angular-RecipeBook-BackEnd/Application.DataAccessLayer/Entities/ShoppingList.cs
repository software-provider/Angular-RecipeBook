using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Application.DataAccessLayer.Entities
{
    public class ShoppingList
    {
        [Required]
        public int UserId { get; set; }

        public ApplicationUser User { get; set; }

        [Required]
        public int IngredientId { get; set; }

        public Ingredient Ingredient { get; set; }

        [Required]
        public int Amount { get; set; }
    }

    public class ShoppingListEntityConfiguration : IEntityTypeConfiguration<ShoppingList>
    {
        public void Configure(EntityTypeBuilder<ShoppingList> builder)
        {
            builder.HasKey(sl => new { sl.UserId, sl.IngredientId });

            builder.HasOne(sl => sl.User)
                .WithMany(u => u.ShoppingList)
                .HasForeignKey(sl => sl.UserId);

            builder.HasOne(sl => sl.Ingredient)
                .WithMany(i => i.ShoppingList)
                .HasForeignKey(sl => sl.IngredientId);
        }
    }
}
