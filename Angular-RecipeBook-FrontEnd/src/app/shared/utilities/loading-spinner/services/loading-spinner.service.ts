import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  private readonly _defaultMessage: string;

  private message: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private spinner: NgxSpinnerService) {
    this._defaultMessage = 'Loading...';
  }

  //#region GETTERS

  public get message$(): Observable<string> {
    return this.message.asObservable();
  }

  //#endregion

  public show(message: string = null) {
    this.message.next(message ?? this._defaultMessage);

    this.spinner.show();
  }

  public hide() {
    this.spinner.hide();
  }
}
