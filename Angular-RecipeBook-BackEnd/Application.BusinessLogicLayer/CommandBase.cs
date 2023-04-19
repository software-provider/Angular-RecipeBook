using System.Threading;
using System.Threading.Tasks;
using Application.DataAccessLayer.Context;
using MediatR;

namespace Application.BusinessLogicLayer
{
    public abstract class CommandBase<TCommand, TResult> : IRequestHandler<TCommand, TResult> where TCommand : IRequest<TResult>
    {
        protected readonly RecipeBookDbContext Context;

        protected CommandBase(RecipeBookDbContext context)
        {
            Context = context;
        }

        public abstract Task<TResult> Handle(TCommand request, CancellationToken cancellationToken);
    }
}
