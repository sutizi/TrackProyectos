import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../_services/proyecto.service';

@Component({
  selector: 'app-proyecto-list',
  templateUrl: './proyecto-list.component.html',
  styleUrls: ['./proyecto-list.component.css']
})
export class ProyectoListComponent implements OnInit {

  Proyecto: any = [];

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



}
