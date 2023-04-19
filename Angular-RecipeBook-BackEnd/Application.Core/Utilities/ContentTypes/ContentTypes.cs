using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Application.Core.Utilities.ContentTypes.Enums;

namespace Application.Core.Utilities.ContentTypes
{
    public static class ContentTypes
    {
        private static readonly ReadOnlyDictionary<ContentType, string> ContentTypesDictionary;

        static ContentTypes()
        {
            ContentTypesDictionary = new ReadOnlyDictionary<ContentType, string>(new Dictionary<ContentType, string>
            {
                {
                    ContentType.Json, "application/json"
                }
            });
        }

        public static string GetContentType(ContentType key)
        {
            ContentTypesDictionary.TryGetValue(key, out string result);

            if (result == null)
            {
                throw new ArgumentNullException(nameof(result), $"The following Content Type does not exist with this key. {nameof(key).ToUpper()}: {key}");
            }

            return result;
        }
    }
}
