import { Component, Input } from '@angular/core';

import { AuthorizedUserDataModel } from 'src/app/core/authorization/models/authorized-user-data.model';

@Component({
  selector: 'app-authorized-user-information',
  templateUrl: './authorized-user-information.component.html',
  styleUrls: ['./authorized-user-information.component.scss'],
})
export class AuthorizedUserInformationComponent {
  @Input() public authorizedUserData: AuthorizedUserDataModel;

  public constructor() {}
}
