import { Component, OnInit, Input } from '@angular/core';
import { ProyectoService } from '../_services/proyecto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyecto-create',
  templateUrl: './proyecto-create.component.html',
  styleUrls: ['./proyecto-create.component.css']
})
export class ProyectoCreateComponent implements OnInit {

  @Input() proyectoDetails = { nombre: '', descripcion: '', fechaInicio: '', fechaFinalizacion: '', link:'' }

  constructor(
    public restApi: ProyectoService, 
    public router: Router
  ) { }

  ngOnInit() { }

  addProyecto(dataEmployee) {
    this.restApi.saveProyecto(this.proyectoDetails).subscribe((data: {}) => {
      this.router.navigate(['/proyecto-list'])
    })
  }

}
