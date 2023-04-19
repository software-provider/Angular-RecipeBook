import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

import { ROUTER_LINKS } from '../../../../constants/sidebar.constants';
import { ClosedSidebarLinkItemModel } from '../../../../models/closed-sidebar-link-item.model';

@Component({
  selector: 'app-closed-sidebar-item',
  templateUrl: './closed-sidebar-item.component.html',
  styleUrls: ['./closed-sidebar-item.component.scss'],
})
export class ClosedSidebarItemComponent {
  @Input() public linkItem: ClosedSidebarLinkItemModel;

  public constructor(private router: Router) {}

  public onNavigation(linkTypeCode: number): void {
    this.router.navigate([ROUTER_LINKS[linkTypeCode]]);
  }
}
