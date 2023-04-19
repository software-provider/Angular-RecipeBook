using System.Threading;
using System.Threading.Tasks;
using Application.DataAccessLayer.Context;
using MediatR;

namespace Application.BusinessLogicLayer
{
    public abstract class QueryBase<TQuery, TResult> : IRequestHandler<TQuery, TResult> where TQuery : IRequest<TResult>
    {
        protected RecipeBookReadOnlyDbContext Context;

        protected QueryBase(RecipeBookReadOnlyDbContext context)
        {
            Context = context;
        }

        public abstract Task<TResult> Handle(TQuery request, CancellationToken cancellationToken);
    }
}
