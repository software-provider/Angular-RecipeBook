using Application.Core.Exceptions.Enums;

namespace Application.Core.Exceptions.Models
{
    public class ApiErrorModel
    {
        public ApiExceptionCode ExceptionCode { get; init; }

        public string Message { get; init; }

        public string Exception { get; init; }
    }
}
