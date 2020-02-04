import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../_services/proyecto.service';
import { NgForm } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proyecto-edit',
  templateUrl: './proyecto-edit.component.html',
  styleUrls: ['./proyecto-edit.component.css']
})
export class ProyectoEditComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  proyectoData: any = {};

  constructor( private restApi: ProyectoService, private actRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  @ViewChild('modal', {read: false, static: true} ) modal: TemplateRef<any>;

  ngOnInit() { 
    this.restApi.getProyecto(this.id).subscribe((data: {}) => {
      this.proyectoData = data;
    })
  }

  updateProyecto() {
      this.restApi.updateProyecto(this.id, this.proyectoData).subscribe((data: {}) => {
        this.mostrar();
        this.router.navigate(['/proyecto-list'])
      })
  }
  cancel() {
    this.router.navigate(['/proyecto-list'])
  }

  mostrar() {
    this.modalService.open(this.modal);
  }

  cerrar() {
    this.modalService.dismissAll();
  }

}
