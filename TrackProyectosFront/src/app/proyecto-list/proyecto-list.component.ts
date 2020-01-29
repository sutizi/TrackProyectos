import { Component, OnInit, Input } from '@angular/core';
import { ProyectoService } from '../_services/proyecto.service';
import { ProyectoDTO } from '../_models/ProyectoDTO';
import { HoraDTO } from '../_models/HoraDTO';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proyecto-list',
  templateUrl: './proyecto-list.component.html',
  styleUrls: ['./proyecto-list.component.css']
})
export class ProyectoListComponent implements OnInit {
  [x: string]: any;

  IdProyectoHoras: any;

  Proyecto: any = [];

  id = this.actRoute.snapshot.params['id'];

  @Input() hora: HoraDTO = new HoraDTO();

  nuevo: HoraDTO = new HoraDTO();

  constructor( public restApi: ProyectoService, public actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadProyectos();
  }

  loadProyectos() {
    return this.restApi.getProyectos().subscribe((data: {}) => {
      this.Proyecto = data;
    })
  }

  deleteProyecto(id) {
    if (window.confirm('¿Seguro que desea eliminarlo?')){
      this.restApi.deleteProyecto(id).subscribe(data => {
        this.loadProyectos()
      })
    }
  }  

  getProyectoId(id){
    this.IdProyectoHoras=id;
  }

   AgregarHoras(regForm:NgForm, id){
    this.nuevo =new HoraDTO();
    this.nuevo.cantidad=parseInt(regForm.value.cantidad);
    this.hora.dia=regForm.value.dia;
    this.hora.descripcion=regForm.value.descripcion;
    this.nuevo.proyectoID=this.IdProyectoHoras;
    this.restApi.saveHoras(this.nuevo).subscribe(res=>{
        alert("Horas de trabajo agregadas");
        this.router.navigate(['/proyecto-list'])
        })
    }

    cancel() {
      this.router.navigate(['/proyecto-list'])
    }
  }


