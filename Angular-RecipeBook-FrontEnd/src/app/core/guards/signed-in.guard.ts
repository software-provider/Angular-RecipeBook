import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthorizedUserService } from '../authorization/services/authorized-user.service';

@Injectable({
  providedIn: 'root',
})
export class SignedInGuard implements CanActivate {
  constructor(private router: Router, private authorizedUserService: AuthorizedUserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authorizedUserService.userIsSignedInFromCache.pipe(
      map((response: boolean) => {
        if (response) {
          this.router.navigate(['/']);

          return false;
        }

        return true;
      })
    );
  }
}
