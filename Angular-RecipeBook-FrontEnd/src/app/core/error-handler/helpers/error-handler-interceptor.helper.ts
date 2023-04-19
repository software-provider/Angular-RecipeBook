import { ApiExceptionCode } from '../enums/api-exception-code.enum';

const exceptionMessages: { [exceptionCode: number]: string } = {
  [ApiExceptionCode.UserNotFound]: 'Logged in user not found in the system!',
  [ApiExceptionCode.SignInUserNotFound]: 'There is no such user in the system!',
  [ApiExceptionCode.UnauthorizedUser]: 'Operation failed! Signed in user is unauthorized',
  [ApiExceptionCode.InvalidAuthorizedUserId]: 'Operation failed! Signed in user identifier is invalid!',
  [ApiExceptionCode.UserIsLockedOut]: 'User is locked out in the system!!',
  [ApiExceptionCode.UserIsNotAllowed]: 'User is not allowed in the system!',
  [ApiExceptionCode.LoginFailed]: 'Username/ password is incorrect!',
  [ApiExceptionCode.RecipeNotFound]: 'This recipe not found in the system!',
  [ApiExceptionCode.UpgradeableRecipeNotFound]: 'This upgradeable recipe is not found in this system!',
  [ApiExceptionCode.DeletableRecipeNotFound]: 'This deletable recipe is not found in this system!',
  [ApiExceptionCode.RecipeNameIsAlreadyExist]: 'This recipe name is already exist in the system!',
};

export function localizeException(exceptionCode: number): string {
  const exceptionMessage = exceptionMessages[exceptionCode];

  if (exceptionMessage) {
    return exceptionMessage;
  }

  return getBadRequestMessage();
}

export function getBadRequestMessage(): string {
  return 'Unknow error!';
}

export function getInternalServerErrorMessage(): string {
  return 'Internal server error!';
}
