using MediatR;

namespace Application.Core.Interfaces
{
    public interface IQuery<out TResult> : IRequest<TResult>
    { }
}
