import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationStateService } from '../_services/aplication-state.service';
import { ProyectoListComponent } from './proyecto-list.component';
import { ProyectoService } from '../_services/proyecto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-proyecto-list',
    templateUrl: './proyecto-list.component.mobile.html',
    styleUrls: ['./proyecto-list.component.css']
  })
  export class ProyectoListComponentMobile extends ProyectoListComponent {
  
    constructor( private ra: ProyectoService, private ar: ActivatedRoute, private r: Router,  private ms: NgbModal, private apps: ApplicationStateService) {
      super(ra, ar, r, ms, apps);
    }
  
  }