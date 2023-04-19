using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Application.DataAccessLayer.Entities
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool IsActive { get; set; }

        public ICollection<ShoppingList> ShoppingList { get; set; }

        public ApplicationUser()
        {
            ShoppingList = new HashSet<ShoppingList>();
        }
    }
}
