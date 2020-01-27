import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../_services/proyecto.service';

@Component({
  selector: 'app-proyecto-edit',
  templateUrl: './proyecto-edit.component.html',
  styleUrls: ['./proyecto-edit.component.css']
})
export class ProyectoEditComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  proyectoData: any = {};

  constructor( public restApi: ProyectoService, public actRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() { 
    this.restApi.getProyecto(this.id).subscribe((data: {}) => {
      this.proyectoData = data;
    })
  }

  updateProyecto() {
    if(window.confirm('¿Seguro que desea editarlo?')){
      this.restApi.updateProyecto(this.id, this.proyectoData).subscribe((data: {}) => {
        this.router.navigate(['/proyecto-list'])
      })
  }
  }
  cancel() {
    this.router.navigate(['/proyecto-list'])
  }
}
