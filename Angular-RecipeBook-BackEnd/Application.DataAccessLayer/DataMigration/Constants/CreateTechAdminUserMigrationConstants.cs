using System.Collections.ObjectModel;
using Application.Core.Roles.Enums;

namespace Application.DataAccessLayer.DataMigration.Constants
{
    public static class CreateTechAdminUserMigrationConstants
    {
        public const string FIRST_NAME = "Administrator";

        public const string LAST_NAME = "Technical";

        public const string USERNAME = "admin";

        public const string EMAIL = "admin@recipebook.com";

        public const string PASSWORD = "techadmin2020";

        public static ReadOnlyCollection<RoleType> ROLES { get; } =
            new(new[] { RoleType.TechnicalAdministrator });
    }
}
