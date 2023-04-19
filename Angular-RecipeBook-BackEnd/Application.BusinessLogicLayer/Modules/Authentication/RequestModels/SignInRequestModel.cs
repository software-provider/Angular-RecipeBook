using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.Authentication.RequestModels
{
    public class SignInRequestModel
    {
        [Required(ErrorMessage = "The User Name field is required!")]
        public string UserName { get; init; }

        [Required(ErrorMessage = "The Password field is required!")]
        public string Password { get; init; }

        [Required(ErrorMessage = "Persistent selection is mandatory!")]
        public bool? IsPersistent { get; init; }
    }
}
