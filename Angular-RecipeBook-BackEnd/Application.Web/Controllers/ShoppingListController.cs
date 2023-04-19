using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Commands;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Queries;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.RequestModels;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.ResponseModels;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Web.Controllers
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{api-version:apiVersion}/[controller]")]
    public class ShoppingListController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ShoppingListController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetLastSavedShoppingList")]
        public async Task<ActionResult<GetLastSavedShoppingListResponseModel>> GetLastSavedShoppingList()
        {
            GetLastSavedShoppingListResponseModel result =
                await _mediator.Send(new GetLastSavedShoppingListQuery());

            return Ok(result);
        }

        [HttpPost("SaveShoppingList")]
        public async Task<ActionResult> SaveShoppingList([FromBody] SaveShoppingListRequestModel requestModel)
        {
            await _mediator.Send(new SaveShoppingListCommand(requestModel));

            return Ok();
        }
    }
}
