import { Component, EventEmitter, Output } from '@angular/core';

import { SidebarLinkType } from '../../../enums/sidebar-link-type.enum';
import { OpenedSidebarLinkItemModel } from '../../../models/opened-sidebar-link-item.model';

@Component({
  selector: 'app-opened-sidebar',
  templateUrl: './opened-sidebar.component.html',
  styleUrls: ['./opened-sidebar.component.scss'],
})
export class OpenedSidebarComponent {
  @Output() public toggleEvent: EventEmitter<boolean>;

  public linkItems: OpenedSidebarLinkItemModel[];

  public constructor() {
    this.toggleEvent = new EventEmitter<boolean>();

    this.linkItems = [
      {
        iconName: 'receipt',
        linkLabel: 'Recipes',
        linkType: SidebarLinkType.Recipe,
      },
      {
        iconName: 'shopping-basket',
        linkLabel: 'Shopping list',
        linkType: SidebarLinkType.ShoppingList,
      },
    ];
  }

  public onNavSideClose() {
    this.toggleEvent.emit(false);
  }
}
