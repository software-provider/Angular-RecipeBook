import { Component } from '@angular/core';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

import { RibbonToastrAnimation } from '../animations/ribbon-toastr.animation';

@Component({
  selector: '[ribbon-toastr]',
  templateUrl: './ribbon-toastr.component.html',
  styleUrls: ['./ribbon-toastr.component.scss'],
  animations: [RibbonToastrAnimation],
  preserveWhitespaces: false,
})
export class RibbonToastrComponent extends Toast {
  public readonly DEFAULT_TOASTR_MESSAGE: string = 'System Message';

  constructor(protected toastrService: ToastrService, public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }
}
