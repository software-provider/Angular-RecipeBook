import { AvatarModule } from 'ngx-avatar';
import { SidebarModule } from 'ng-sidebar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxCurrencyModule } from 'ngx-currency';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesomeIconsModule } from './modules/fontawesome-icons.module';

import { TruncatePipe } from './pipes/truncate.pipe';
import { ThousandSeparatorPipe } from './pipes/thousand-separator.pipe';

import { DropDownDirective } from './directives/dropdown.directive';

import { FooterComponent } from './utilities/footer/container/footer.component';
import { HeaderComponent } from './utilities/header/container/header.component';
import { SideNavComponent } from './utilities/sidebar/container/sidebar.component';
import { RibbonToastrComponent } from './utilities/ribbon-toastr/container/ribbon-toastr.component';
import { LoadingSpinnerComponent } from './utilities/loading-spinner/container/loading-spinner.component';
import { OpenedSidebarComponent } from './utilities/sidebar/container/components/opened-sidebar/opened-sidebar.component';
import { ClosedSidebarComponent } from './utilities/sidebar/container/components/closed-sidebar/closed-sidebar.component';
import { OpenedSidebarItemComponent } from './utilities/sidebar/container/components/opened-sidebar/opened-sidebar-item/opened-sidebar-item.component';
import { ClosedSidebarItemComponent } from './utilities/sidebar/container/components/closed-sidebar/closed-sidebar-item/closed-sidebar-item.component';
import { AuthorizedUserInformationComponent } from './utilities/header/container/components/authorized-user-information/authorized-user-information.component';

@NgModule({
  declarations: [
    TruncatePipe,
    HeaderComponent,
    FooterComponent,
    DropDownDirective,
    RibbonToastrComponent,
    ThousandSeparatorPipe,
    LoadingSpinnerComponent,
    SideNavComponent,
    ClosedSidebarComponent,
    ClosedSidebarItemComponent,
    OpenedSidebarComponent,
    OpenedSidebarItemComponent,
    AuthorizedUserInformationComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    NgxSpinnerModule,
    UiSwitchModule,
    FontAwesomeModule,
    SidebarModule,
    AvatarModule,
    NgxCurrencyModule,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    DropDownDirective,
    HeaderComponent,
    FooterComponent,
    NgxSpinnerModule,
    LoadingSpinnerComponent,
    UiSwitchModule,
    FontAwesomeIconsModule,
    FontAwesomeModule,
    SideNavComponent,
    SidebarModule,
    TruncatePipe,
    ThousandSeparatorPipe,
    NgxCurrencyModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [RibbonToastrComponent],
})
export class SharedModule {}
