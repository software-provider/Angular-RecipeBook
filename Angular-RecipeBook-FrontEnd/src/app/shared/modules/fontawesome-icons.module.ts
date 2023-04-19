import { NgModule } from '@angular/core';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCogs,
  faEraser,
  faPlus,
  faPlusSquare,
  faRedoAlt,
  faSave,
  faSyncAlt,
  faTasks,
  faTrashAlt,
  faSignInAlt,
  faSignOutAlt,
  faBookOpen,
  faReceipt,
  faShoppingBasket,
  faFileDownload,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({})
export class FontAwesomeIconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faPlus,
      faSave,
      faRedoAlt,
      faTrashAlt,
      faTasks,
      faPlusSquare,
      faCogs,
      faEraser,
      faSyncAlt,
      faSignInAlt,
      faSignOutAlt,
      faBookOpen,
      faReceipt,
      faShoppingBasket,
      faFileDownload
    );
  }
}
