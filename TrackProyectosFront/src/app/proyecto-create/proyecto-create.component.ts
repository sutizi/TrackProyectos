import { Component, OnInit, Input } from '@angular/core';
import { ProyectoService } from '../_services/proyecto.service';
import { Router } from '@angular/router';
import { ProyectoDTO } from '../_models/ProyectoDTO';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proyecto-create',
  templateUrl: './proyecto-create.component.html',
  styleUrls: ['./proyecto-create.component.css']
})
  
export class ProyectoCreateComponent implements OnInit {
  objtempemp:ProyectoDTO;
  isDateFailed = false;
  errorMessage= "Error";
  
  constructor( public restApi: ProyectoService, public router: Router) {}

   @Input() objemp: ProyectoDTO = new ProyectoDTO();
   
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
          alert("Proyecto agregado");
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

}