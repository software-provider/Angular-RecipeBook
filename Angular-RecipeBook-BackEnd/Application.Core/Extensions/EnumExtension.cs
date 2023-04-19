using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace Application.Core.Extensions
{
    public static class EnumExtension
    {
        public static T GetAttribute<T>(this Enum value) where T : Attribute
        {
            Type type = value.GetType();
            MemberInfo[] memberInfo = type.GetMember(value.ToString());
            object[] attributes = memberInfo[0].GetCustomAttributes(typeof(T), false);

            return (T)attributes.FirstOrDefault();
        }

        public static string ToDisplayName(this Enum value)
        {
            DisplayAttribute attribute = value.GetAttribute<DisplayAttribute>();

            if (attribute == null)
            {
                throw new ArgumentNullException(nameof(attribute), "The value of the following attribute cannot be null!");
            }

            return attribute.Name;
        }
    }
}
