import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { AUTO_COLLAPSE_WIDTH_SIZE, DOCKED_SIZE, MODE_KEYS, POSITION_KEYS } from '../constants/sidebar.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() public isVisible$: Observable<boolean>;

  public isOpened: boolean;
  public isDocked: boolean;
  public isAnimate: boolean;

  public mode: string;
  public position: string;

  public dockedSize: string;
  public autoCollapseWidthSize: number;

  public constructor() {
    this.isOpened = false;

    this.mode = MODE_KEYS['PUSH'];
    this.position = POSITION_KEYS['LEFT'];

    this.dockedSize = DOCKED_SIZE;
    this.autoCollapseWidthSize = AUTO_COLLAPSE_WIDTH_SIZE;
  }

  public ngOnInit(): void {
    this.isVisible$.subscribe(isVisible => {
      this.setSidebarVisibility(isVisible);
    });
  }

  public onToggleSwitch(isOpened: boolean): void {
    this.isOpened = isOpened;
  }

  private setSidebarVisibility(isVisible: boolean) {
    if (isVisible) {
      this.isDocked = true;
      this.isAnimate = true;
    } else {
      this.isDocked = false;
      this.isAnimate = false;
      this.isOpened = false;
    }
  }
}
