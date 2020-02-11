import { Component, OnInit, Input, TemplateRef, ViewChild, HostListener } from '@angular/core';
import { ProyectoService } from '../_services/proyecto.service';
import { HoraDTO } from '../_models/HoraDTO';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationStateService } from '../_services/aplication-state.service';
import { ProyectoDTO } from '../_models/ProyectoDTO';
import { LoginComponent } from '../login/login.component';
import { TokenStorageService } from '../_services/token-storage.service';
import { StylesCompileDependency } from '@angular/compiler';

@Component({
  selector: 'app-proyecto-list',
  templateUrl: './proyecto-list.component.html',
  styleUrls: ['./proyecto-list.component.css']
})
export abstract class ProyectoListComponent implements OnInit {
  [x: string]: any;

  IdProyectoHoras: any;

  Proyecto: any = [];

  errorMessage = 'Error';

  falla = false;

  id = this.actRoute.snapshot.params['id'];

  idEliminar = 0;
  cantidadHoras=1;

  loginComponent = null;

  public myViewModel: ProyectoDTO;
  private model: ProyectoDTO;
  isMobileResolution: boolean;

  @Input() hora: HoraDTO = new HoraDTO();
  @ViewChild('modal', {read: false, static: true} ) modal: TemplateRef<any>;
  @ViewChild('modalEliminar', {read: false, static: true} ) modalEliminar: TemplateRef<any>;
  @ViewChild('modalEliminarConfirmacion', {read: false, static: true} ) modalEliminarConfirmacion: TemplateRef<any>;

  nuevo: HoraDTO = new HoraDTO();

  constructor( private restApi: ProyectoService, private actRoute: ActivatedRoute, private router: Router,  private modalService: NgbModal, private applicationStateService: ApplicationStateService, private lc: LoginComponent, private tokenStorage: TokenStorageService) {
    this.applicationStateService = applicationStateService;
    this.model = new ProyectoDTO();
    this.myViewModel = new ProyectoDTO();
    this.loginComponent = lc;
    this.actualizarVista();
   }

  ngOnInit() {

    console.log(JSON.parse(localStorage.getItem('mantenerSesion'))+'mantener');
    if (this.tokenStorage.getToken()) {
      if(JSON.parse(localStorage.getItem('mantenerSesion')) == true)
      {
        this.loadProyectos();
      }
      else //si mantener sesion es falso
      {

      
        this.loadProyectos();

      }
    }
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
    this.nuevo.dia=new Date(this.hoy()); //setea la fecha de hoy 
    this.nuevo.cantidad=this.cantidadHoras;
    this.nuevo.descripcion=regForm.value.descripcion;
    this.nuevo.proyectoID=this.IdProyectoHoras;
    this.nuevo.dia=regForm.value.dia; //recupera la fecha ingresada por el calendario
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
    this.cantidadHoras++;
  }
  restarHora(){ 
    this.cantidadHoras--;
  }


  private actualizarVista(): void {
    this.myViewModel = this.model.clone();
    if (this.applicationStateService.getIsMobileResolution())
    {
        console.log("mobile"+"....is mobile resolution:"+this.isMobileResolution)
    }
    else
    {
      console.log("desktop"+"....is mobile resolution:"+this.isMobileResolution);
    }
    }

    logout() {
      this.tokenStorage.signOut();
       localStorage.removeItem('currentUser');
    }

    @HostListener("window:beforeunload",["$event"])
    cerrarSesion($event)
    {
      if (JSON.parse(localStorage.getItem('mantenerSesion')) == false)
        this.logout();
     }


}
