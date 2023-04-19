import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './containers/sign-in/sign-in.component';

@NgModule({
  declarations: [SignInComponent],
  imports: [AuthenticationRoutingModule, SharedModule],
})
export class AuthenticationModule {}
