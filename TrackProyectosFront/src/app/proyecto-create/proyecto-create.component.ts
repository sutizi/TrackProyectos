import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { ProyectoService } from '../_services/proyecto.service';
import { Router } from '@angular/router';
import { ProyectoDTO } from '../_models/ProyectoDTO';
import { NgForm } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proyecto-create',
  templateUrl: './proyecto-create.component.html',
  styleUrls: ['./proyecto-create.component.css']
})
  
export class ProyectoCreateComponent implements OnInit {
  objtempemp:ProyectoDTO;
  isDateFailed = false;
  errorMessage= "Error";
  
  constructor( private restApi: ProyectoService, private router: Router,  private modalService: NgbModal) {}

   @Input() objemp: ProyectoDTO = new ProyectoDTO();
   @ViewChild('modal', {read: false, static: true} ) modal: TemplateRef<any>;
   
   ngOnInit() { }

   Register(regForm:NgForm){
    var item = JSON.parse(localStorage.getItem('currentUser'));
    var userId = parseInt(item.id);
    this.objtempemp=new ProyectoDTO();
    this.objtempemp.nombre=regForm.value.nombre;
    this.objtempemp.descripcion=regForm.value.descripcion;
    this.objtempemp.fechaInicio=regForm.value.fechaInicio;
    this.objtempemp.fechaFinalizacion=regForm.value.fechaFinalizacion;
    this.objtempemp.link=regForm.value.link;
    this.objtempemp.programadorID=userId;

    this.restApi.saveProyecto(this.objtempemp).subscribe(
        () => {
          this.mostrar();
          this.isDateFailed = false;
          this.router.navigate(['/proyecto-list']);
        },
        err => {
          this.isDateFailed = true;
          this.errorMessage = err;
        }
      );
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