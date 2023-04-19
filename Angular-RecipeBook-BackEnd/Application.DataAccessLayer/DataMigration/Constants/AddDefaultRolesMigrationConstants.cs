using System.Collections.ObjectModel;
using Application.Core.Roles.Enums;

namespace Application.DataAccessLayer.DataMigration.Constants
{
    public static class AddDefaultRolesMigrationConstants
    {
        public static ReadOnlyCollection<RoleType> DEFAULT_ROLES { get; } =
            new(new[] { RoleType.TechnicalAdministrator });
    }
}
