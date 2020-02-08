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

  idEliminar = 0;

  @Input() hora: HoraDTO = new HoraDTO();
  @ViewChild('modal', {read: false, static: true} ) modal: TemplateRef<any>;
  @ViewChild('modalEliminar', {read: false, static: true} ) modalEliminar: TemplateRef<any>;
  @ViewChild('modalEliminarConfirmacion', {read: false, static: true} ) modalEliminarConfirmacion: TemplateRef<any>;

  nuevo: HoraDTO = new HoraDTO();

  constructor( private restApi: ProyectoService, private actRoute: ActivatedRoute, private router: Router,  private modalService: NgbModal) { }

  ngOnInit() {
    this.loadProyectos();
  }

  loadProyectos() {
    return this.restApi.getProyectos().subscribe((data: {}) => {
      this.Proyecto = data;
    })
  }

  deleteProyecto() {
      this.restApi.deleteProyecto(this.idEliminar).subscribe(() => {
        this.loadProyectos();
        this.mostrarEliminar();
      })
  }  

  getProyectoId(id){
    this.IdProyectoHoras=id;
  }

   AgregarHoras(regForm:NgForm){
    this.nuevo =new HoraDTO();
    this.nuevo.cantidad=parseInt((<HTMLInputElement>document.getElementById("cantHoras")).value);
    //this.nuevo.dia=regForm.value.dia;
    this.nuevo.dia=new Date(this.hoy());
    this.nuevo.descripcion=regForm.value.descripcion;
    this.nuevo.proyectoID=this.IdProyectoHoras;
    this.restApi.saveHoras(this.nuevo).subscribe(()=>{
    this.router.navigate(['/proyecto-list'])
    this.mostrarModal();
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
  

  mostrarModal() {
    this.modalService.open(this.modal);
  }

  mostrarEliminar() {
    this.modalService.open(this.modalEliminar);
  }

  mostrarEliminarConfirmacion(id) {
    this.modalService.open(this.modalEliminarConfirmacion);
    this.idEliminar = id;
  }

  cerrar() {
    this.modalService.dismissAll();
  }

  hoy(){ 
    var date = new Date();

    var day = (date.getDate())+"";
    var month = (date.getMonth()+1)+"";
    var year = date.getFullYear();

    if (parseInt(month) < 10) month = "0"+month; 
    if (parseInt(day) < 10) day = "0"+day;

    var today = year + "-" + month + "-" + day;
    (<HTMLInputElement>document.getElementById("theDate")).value = today;
    return today;
    
  }


  sumarHora(){ 
    var hora= parseInt((<HTMLInputElement>document.getElementById("cantHoras")).value) ;
    var suma= hora+1;
    (<HTMLInputElement>document.getElementById("cantHoras")).value = ""+suma;
  }

  
  restarHora(){ 
    var hora= parseInt((<HTMLInputElement>document.getElementById("cantHoras")).value) ;
    var suma= hora-1;
    (<HTMLInputElement>document.getElementById("cantHoras")).value = ""+suma;
  }

}
