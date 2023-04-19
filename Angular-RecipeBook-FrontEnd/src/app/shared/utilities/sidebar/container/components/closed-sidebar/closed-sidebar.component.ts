import { Component, EventEmitter, Output } from '@angular/core';

import { SidebarLinkType } from '../../../enums/sidebar-link-type.enum';
import { ClosedSidebarLinkItemModel } from '../../../models/closed-sidebar-link-item.model';

@Component({
  selector: 'app-closed-sidebar',
  templateUrl: './closed-sidebar.component.html',
  styleUrls: ['./closed-sidebar.component.scss'],
})
export class ClosedSidebarComponent {
  @Output() public toggleEvent: EventEmitter<boolean>;

  public linkItems: ClosedSidebarLinkItemModel[];

  public constructor() {
    this.toggleEvent = new EventEmitter<boolean>();

    this.linkItems = [
      { iconName: 'receipt', linkType: SidebarLinkType.Recipe },
      {
        iconName: 'shopping-basket',
        linkType: SidebarLinkType.ShoppingList,
      },
    ];
  }

  public onNavSideOpen(): void {
    this.toggleEvent.emit(true);
  }
}
