import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationStateService } from '../_services/aplication-state.service';
import { ProyectoListComponent } from './proyecto-list.component';
import { ProyectoService } from '../_services/proyecto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponentDesktop } from '../login/login.component.desktop';

@Component({
    selector: 'app-proyecto-list',
    templateUrl: './proyecto-list.component.html',
    styleUrls: ['./proyecto-list.component.css']
  })
  @Injectable({
    providedIn: 'root'
  })
  export class ProyectoListComponentDesktop extends ProyectoListComponent {
  
    constructor( private ra: ProyectoService, private ar: ActivatedRoute, private r: Router,  private ms: NgbModal, private apps: ApplicationStateService, private logc: LoginComponentDesktop, private ts: TokenStorageService) {
        super(ra, ar, r, ms, apps, logc, ts);
      }
  
  }