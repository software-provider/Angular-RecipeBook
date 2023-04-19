using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.Commands;
using Application.BusinessLogicLayer.Modules.RecipeModule.Queries;
using Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels;
using Application.BusinessLogicLayer.Modules.RecipeModule.ResponseModels;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Web.Controllers
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{api-version:apiVersion}/[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RecipeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("GetById")]
        public async Task<ActionResult<GetRecipeByIdResponseModel>> GetRecipeById([FromBody] GetRecipeByIdRequestModel requestModel)
        {
            GetRecipeByIdResponseModel recipe = await _mediator.Send(new GetRecipeByIdQuery(requestModel));

            return Ok(recipe);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<GetAllRecipeResponseModel>> GetAllRecipe()
        {
            GetAllRecipeResponseModel result = await _mediator.Send(new GetAllRecipeQuery());

            return Ok(result);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateRecipe([FromBody] CreateRecipeRequestModel requestModel)
        {
            await _mediator.Send(new CreateRecipeCommand(requestModel));

            return Ok();
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateRecipe([FromBody] UpdateRecipeRequestModel model)
        {
            await _mediator.Send(new UpdateRecipeCommand(model));

            return Ok();
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> DeleteRecipe([FromBody] DeleteRecipeRequestModel requestModel)
        {
            await _mediator.Send(new DeleteRecipeCommand(requestModel));

            return Ok();
        }

        [HttpPost("RecipeNameIsExist")]
        public async Task<ActionResult<RecipeNameIsExistResponseModel>> RecipeNameIsExist(RecipeNameIsExistRequestModel requestModel)
        {
            RecipeNameIsExistResponseModel response = await _mediator.Send(new RecipeNameIsExistQuery(requestModel));

            return Ok(response);
        }
    }
}