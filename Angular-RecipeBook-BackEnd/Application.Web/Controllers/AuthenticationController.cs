using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.Authentication.Commands;
using Application.BusinessLogicLayer.Modules.Authentication.RequestModels;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Application.Web.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{api-version:apiVersion}/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthenticationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("SignIn")]
        public async Task<ActionResult> SignIn(SignInRequestModel requestModel)
        {
            await _mediator.Send(new SignInCommand(requestModel));

            return Ok();
        }

        [HttpGet("SignOut")]
        public new async Task<ActionResult> SignOut()
        {
            await _mediator.Send(new SignOutCommand());

            return Ok();
        }
    }
}
