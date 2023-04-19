import { SidebarLinkType } from '../enums/sidebar-link-type.enum';

export interface OpenedSidebarLinkItemModel {
  iconName: string;
  linkType: SidebarLinkType;
  linkLabel: string;
}
