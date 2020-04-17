import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DropdownService {
  private closeBrandDropdown = new Subject();
  private closeGearboxDropdown = new Subject();
  private closeFuelDropdown = new Subject();
  private closeModelDropdown = new Subject();
  closeFuelDropdownObs = this.closeFuelDropdown.asObservable();
  closeGearboxDropdownObs = this.closeGearboxDropdown.asObservable();
  closeBrandDropdownObs = this.closeBrandDropdown.asObservable();
  closeModelDropdownObs = this.closeModelDropdown.asObservable();

  openBrandDropdownOnly() {
    this.closeFuelDropdown.next();
    this.closeGearboxDropdown.next();
    this.closeModelDropdown.next();
  }

  openGearboxDropdownOnly() {
    this.closeBrandDropdown.next();
    this.closeFuelDropdown.next();
    this.closeModelDropdown.next();
  }

  openFuelDropdownOnly() {
    this.closeBrandDropdown.next();
    this.closeGearboxDropdown.next();
    this.closeModelDropdown.next();
  }

  openModelDropdownOnly() {
    this.closeBrandDropdown.next();
    this.closeFuelDropdown.next();
    this.closeGearboxDropdown.next();
  }
}
