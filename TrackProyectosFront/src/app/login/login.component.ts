import { OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { Usuario } from '../_models/usuario';
import { ApplicationStateService } from '../_services/aplication-state.service';


export abstract class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  public myViewModel: Usuario;
  private model: Usuario;
  isMobileResolution: boolean;
  mantenerSesion = true;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router : Router, private applicationStateService: ApplicationStateService) { 
    this.model = new Usuario();
    this.myViewModel = new Usuario();
    this.applicationStateService = applicationStateService;
    this.actualizarVista();
  }



  ngOnInit() {
    this.mantenerSesion = true;
    console.log(this.mantenerSesion+'mantener');

}

  onSubmit() {
    this.isLoggedIn = true;
    this.form.mantenerSesion = this.mantenerSesion;
    this.authService.login(this.form).subscribe(
      data => {
        localStorage.setItem('mantenerSesion', JSON.stringify(this.mantenerSesion));
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/proyecto-list']);
      },
      err => {
        this.errorMessage = err;
        this.isLoginFailed = true;
      }
    );
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

    updateMantenerSesion()
    {
      console.log(this.mantenerSesion+'antes');
      if(this.mantenerSesion == true)
        this.mantenerSesion = false;
      else
        this.mantenerSesion = true;
      console.log(this.mantenerSesion+'despues');

      localStorage.setItem('mantenerSesion', JSON.stringify(this.mantenerSesion));
    }

    logout() {
      this.tokenStorage.signOut();
       localStorage.removeItem('currentUser');
       this.isLoggedIn = false;
      window.location.reload();
    }
}