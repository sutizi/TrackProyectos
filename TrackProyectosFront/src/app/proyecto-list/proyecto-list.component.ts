import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { ProyectoService } from '../_services/proyecto.service';
import { HoraDTO } from '../_models/HoraDTO';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proyecto-list',
  templateUrl: './proyecto-list.component.html',
  styleUrls: ['./proyecto-list.component.css']
})
export class ProyectoListComponent implements OnInit {
  [x: string]: any;

  IdProyectoHoras: any;

  Proyecto: any = [];

  errorMessage = 'Error';

  falla = false;

  id = this.actRoute.snapshot.params['id'];

  @Input() hora: HoraDTO = new HoraDTO();
  @ViewChild('modal', {read: false, static: true} ) modal: TemplateRef<any>;

  nuevo: HoraDTO = new HoraDTO();

  constructor( public restApi: ProyectoService, public actRoute: ActivatedRoute, public router: Router,  private modalService: NgbModal) { }

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
      this.restApi.deleteProyecto(id).subscribe(() => {
        this.loadProyectos()
      })
    }
  }  

  getProyectoId(id){
    this.IdProyectoHoras=id;
  }

   AgregarHoras(regForm:NgForm){
    this.nuevo =new HoraDTO();
    this.nuevo.cantidad=parseInt(regForm.value.cantidad);
    this.nuevo.dia=regForm.value.dia;
    this.nuevo.descripcion=regForm.value.descripcion;
    this.nuevo.proyectoID=this.IdProyectoHoras;
    this.restApi.saveHoras(this.nuevo).subscribe(()=>{
    this.router.navigate(['/proyecto-list'])
    this.mostrar();
    this.falla = false;
        },
      err => {
        this.falla = true;
        this.errorMessage = err;
      });
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
