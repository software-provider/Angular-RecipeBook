using Application.Core.Interfaces;

namespace Application.Core.Structs
{
    public struct Result : IResult
    {
        public readonly bool IsSuccessFul;

        public readonly string Message;

        private Result(bool isSuccessFul, string message)
        {
            IsSuccessFul = isSuccessFul;
            Message = message;
        }

        public static Result Success()
        {
            return new Result(true, null);
        }

        public static Result Error(string message)
        {
            return new Result(false, message);
        }
    }

    public struct Result<T> : IResult
    {
        public readonly T Value;

        public readonly bool IsSuccessFul;

        public readonly string Message;

        public Result(T value, bool isSuccessFul, string message)
        {
            Value = value;
            IsSuccessFul = isSuccessFul;
            Message = message;
        }

        public static Result<T> Success(T value)
        {
            return new Result<T>(value, true, null);
        }

        public static Result<T> Success()
        {
            return new Result<T>(default, true, null);
        }

        public static Result<T> Error(string message)
        {
            return new Result<T>(default, false, message);
        }

        public static Result<T> Error(T value, string message)
        {
            return new Result<T>(value, false, message);
        }
    }
}
