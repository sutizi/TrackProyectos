import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Usuario } from '../_models/usuario';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  @Input() usuario: Usuario = new Usuario();
  @ViewChild('modal', {read: false, static: true} ) modal: TemplateRef<any>;

  nuevo: Usuario = new Usuario();

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, public restApi: UserService, public router: Router,private modalService: NgbModal) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

    this.restApi.getUsuario().subscribe((data: {}) => {
      this.form = data;
    });

  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err;
        this.isLoginFailed = true;
      }
    );
  }

  actualizarUsuario(){
    this.restApi.actualizarUsuario(this.form).subscribe((data: {}) => {
      this.mostrar();
      this.authService.login(this.form).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
        },
        err => {
          this.errorMessage = err;
          this.isLoginFailed = true;
        }
      );
    })
  }

  reloadPage() {
    window.location.reload();
  }

  mostrar() {
    this.modalService.open(this.modal);
  }

  cerrar() {
    this.modalService.dismissAll();
    
  }
}
