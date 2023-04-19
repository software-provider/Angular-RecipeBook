import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

import { ROUTER_LINKS } from '../../../../constants/sidebar.constants';
import { OpenedSidebarLinkItemModel } from '../../../../models/opened-sidebar-link-item.model';

@Component({
  selector: 'app-opened-sidebar-item',
  templateUrl: './opened-sidebar-item.component.html',
  styleUrls: ['./opened-sidebar-item.component.scss'],
})
export class OpenedSidebarItemComponent {
  @Input() public linkItem: OpenedSidebarLinkItemModel;

  public constructor(private router: Router) {}

  public onNavigation(linkTypeCode: number): void {
    this.router.navigate([ROUTER_LINKS[linkTypeCode]]);
  }
}
