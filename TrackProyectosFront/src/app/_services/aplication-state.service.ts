import { Injectable, OnInit } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class ApplicationStateService implements OnInit{

  isMobileResolution: boolean;

  ngOnInit() {
  }
  

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