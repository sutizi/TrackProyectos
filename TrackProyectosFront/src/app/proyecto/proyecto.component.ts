import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { ObservedValuesFromArray } from 'rxjs';
import { ProyectoService } from '../_services/proyecto.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  proyectoForms : FormArray = this.fb.array([]);

  proyecto = null;

  constructor(private fb: FormBuilder, private proyectoService : ProyectoService) { }

  ngOnInit() {

    //this.proyectoService.getProyecto().subscribe(res => this.proyecto = res);
    //this.addProyectoForm();
  }

  addProyectoForm(){
    this.proyectoForms.push(this.fb.group({
      Id : [0],
      Nombre : [''],
      Descripcion : [''],
      FechaInicio:[],
      FechaFinalizacion : []


    }));
  }

}
