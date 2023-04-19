using System;
using Application.Core.Exceptions.Enums;

namespace Application.Core.Exceptions
{
    public class ApiException : Exception
    {
        public ApiExceptionCode ExceptionCode { get; }

        public ApiException() { }

        public ApiException(string message) : base(message) { }

        public ApiException(string message, Exception innerException) : base(message, innerException) { }

        public ApiException(ApiExceptionCode exceptionCode)
        {
            ExceptionCode = exceptionCode;
        }

        public ApiException(ApiExceptionCode exceptionCode, string message) : base(message)
        {
            ExceptionCode = exceptionCode;
        }

        public ApiException(ApiExceptionCode exceptionCode, string message, Exception innerException) : base(message, innerException)
        {
            ExceptionCode = exceptionCode;
        }
    }
}
