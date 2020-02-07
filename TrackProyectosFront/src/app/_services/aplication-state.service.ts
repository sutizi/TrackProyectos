import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class ApplicationStateService {

  private isMobileResolution: boolean;

  constructor() {
    if (window.innerWidth < 900) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  public getIsMobileResolution(): boolean {
    if (window.innerWidth < 900) {
        this.isMobileResolution = true;
      } else {
        this.isMobileResolution = false;
      }
      return this.isMobileResolution;
  }
}