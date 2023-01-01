import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss'],
})
export class AddressDetailsComponent {
  /** address details */
  @Input('addressDetails') addressDetails: any;

  /** toggle details panel */
  @Input('displayPanel') displayPanel: boolean = false;

  /** event emitter for closing panel */
  @Output() panelClosed = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  /**
   * this simple function created for closing the details panel
   * @returns panel closed and emit value to parent
   */
  closeSideBar() {
    this.displayPanel = false;
    this.panelClosed.emit(false);
  }
}
