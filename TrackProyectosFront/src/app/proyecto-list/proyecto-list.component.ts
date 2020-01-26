import { Component, OnInit, Input } from '@angular/core';
import { ProyectoService } from '../_services/proyecto.service';
import { ProyectoDTO } from '../_models/ProyectoDTO';
import { HoraDTO } from '../_models/HoraDTO';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proyecto-list',
  templateUrl: './proyecto-list.component.html',
  styleUrls: ['./proyecto-list.component.css']
})
export class ProyectoListComponent implements OnInit {
  [x: string]: any;

  Proyecto: any = [];

  @Input() hora: HoraDTO = new HoraDTO();

  constructor( public restApi: ProyectoService) { }

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


   AgregarHoras(regForm:NgForm){
    var item = JSON.parse(localStorage.getItem('currentUser'));
    this.hora=new HoraDTO();
    this.hora.cantidad=regForm.value.cantidad;
    this.hora.dia=regForm.value.dia;
    this.hora.descripcion=regForm.value.descripcion;
    //this.hora.proyectoID=idProyecto;
   
    this.restApi.saveProyecto(this.hora).subscribe(res=>{
        alert("Project Added successfully");
        this.router.navigate(['/proyecto-list'])
        })
    }
  }


