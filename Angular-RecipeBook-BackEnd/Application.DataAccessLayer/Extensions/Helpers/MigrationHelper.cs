using System;
using System.Linq;
using System.Reflection;
using Application.DataAccessLayer.DataMigration.Interfaces;

namespace Application.DataAccessLayer.Extensions.Helpers
{
    public static class MigrationHelper
    {
        public static Type[] GetMigrationTypes()
        {
            Assembly assembly = Assembly.GetAssembly(typeof(IBaseMigration)) ?? throw new ArgumentNullException(nameof(IBaseMigration));

            return assembly.GetTypes()
                           .Where(t => t.GetInterfaces().Contains(typeof(IBaseMigration)))
                           .ToArray();
        }

        public static TMigration GetMigration<TMigration>(Type[] migrationTypes) where TMigration : class, IBaseMigration
        {
            Type migration = migrationTypes.First(x => x == typeof(TMigration));

            return Activator.CreateInstance(migration) as TMigration;
        }
    }
}
