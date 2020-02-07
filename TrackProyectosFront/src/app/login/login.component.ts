import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router : Router, private applicationStateService: ApplicationStateService) { 
    this.model = new Usuario();
    this.myViewModel = new Usuario();
    this.applicationStateService = applicationStateService;
    this.actualizarVista();
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
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

}