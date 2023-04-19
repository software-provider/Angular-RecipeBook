import { Component } from '@angular/core';

import { LoadingSpinnerService } from '../services/loading-spinner.service';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {
  constructor(private loadingSpinnerService: LoadingSpinnerService) {}

  public get message$() {
    return this.loadingSpinnerService.message$;
  }
}
