import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { AppHeaderService } from './shared/utilities/header/services/app-header.service';
import { AuthorizedUserService } from './core/authorization/services/authorized-user.service';

import { DEFAULT_BROWSER_TAB_TITLE } from './core/utilities/browser-data/constants/browser-data.constants';

import { RouterDataModel } from './core/router/models/router-data.model';
import { HeaderTitleDataModel } from './core/router/models/header-title-data.model';
import { BrowserTitleDataModel } from './core/router/models/browser-title-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  //#region GETTERS

  public get userSignInState$(): Observable<boolean> {
    return this.authorizedUserService.userSignInState$;
  }

  //#endregion

  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appHeaderService: AppHeaderService,
    private authorizedUserService: AuthorizedUserService,
    private titleService: Title
  ) {
    this.subscriptions.push(
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        const activatedRoute = this.getActivatedRoute(this.activatedRoute);

        activatedRoute.data.subscribe((data: RouterDataModel) => {
          const headerTitleData: HeaderTitleDataModel = data.headerTitle;
          const browserTitleData: BrowserTitleDataModel = data.browserTitle;

          this.titleService.setTitle(browserTitleData?.name ?? DEFAULT_BROWSER_TAB_TITLE);

          if (headerTitleData) {
            this.appHeaderService.setTitleData(headerTitleData);
          }
        });
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  private getActivatedRoute(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getActivatedRoute(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
