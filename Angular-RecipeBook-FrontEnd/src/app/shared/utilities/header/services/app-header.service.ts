import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HeaderTitleDataModel } from 'src/app/core/router/models/header-title-data.model';

@Injectable({
  providedIn: 'root',
})
export class AppHeaderService {
  private titleData: BehaviorSubject<HeaderTitleDataModel> = new BehaviorSubject<HeaderTitleDataModel>(null);

  public setTitleData(titleData: HeaderTitleDataModel) {
    this.titleData.next(titleData);
  }

  public get titleData$(): Observable<HeaderTitleDataModel> {
    return this.titleData.asObservable();
  }
}
