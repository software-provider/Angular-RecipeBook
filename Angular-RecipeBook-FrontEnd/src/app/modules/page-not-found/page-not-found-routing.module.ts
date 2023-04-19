import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './container/page-not-found.component';

import { MODULE_NAMES } from './constants/module-names.constant';

import { RouterDataModel } from 'src/app/core/router/models/router-data.model';
import { HeaderTitleDataModel } from 'src/app/core/router/models/header-title-data.model';

const routes: Routes = [
  {
    path: '',
    component: PageNotFoundComponent,
    data: {
      headerTitle: {
        mainTitle: MODULE_NAMES['MAIN'],
      } as HeaderTitleDataModel,
      browserTitle: { name: `${MODULE_NAMES['MAIN']}` },
    } as RouterDataModel,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageNotFoundRoutingModule {}
