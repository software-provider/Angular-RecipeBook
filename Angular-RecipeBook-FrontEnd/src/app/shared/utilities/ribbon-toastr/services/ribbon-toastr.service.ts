import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RibbonToastrService {
  constructor(private toastrService: ToastrService) {}

  public success(message: string, title?: string): void {
    this.toastrService.success(message, title, {
      titleClass: 'title success',
    });
  }

  public error(message: string, title?: string): void {
    this.toastrService.success(message, title, {
      titleClass: 'title error',
    });
  }
}
