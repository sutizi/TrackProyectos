import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Usuario } from '../_models/usuario';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';


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
  roles: string[] = [];

  @Input() usuario: Usuario = new Usuario();

  nuevo: Usuario = new Usuario();

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, public restApi: UserService, public router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
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
        this.roles = this.tokenStorage.getUser().roles;
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
        alert("Usuario actualizado exitosamente");
        this.router.navigate(['/proyecto-list'])
        })
    }

  reloadPage() {
    window.location.reload();
  }
}