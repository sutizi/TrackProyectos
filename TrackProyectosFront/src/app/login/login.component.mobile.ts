import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { ApplicationStateService } from '../_services/aplication-state.service';
import { LoginComponent } from './login.component';

@Component({
    selector:    'app-login-mobile',
    templateUrl: './login.component.mobile.html',
    styleUrls:   ['./login.component.css']
  })
  export class LoginComponentMobile extends LoginComponent {
  
    constructor(private as: AuthService, private ts: TokenStorageService, private r : Router, private apps: ApplicationStateService) {
      super(as, ts, r, apps);
    }
  
  }