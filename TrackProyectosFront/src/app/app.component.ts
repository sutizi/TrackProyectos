import { Component, OnInit, HostListener } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { AuthService } from './_services/auth.service';
import { Usuario } from './_models/usuario';
import { ApplicationStateService } from './_services/aplication-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: Usuario;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  isMobile : boolean;

  constructor(private tokenStorageService: TokenStorageService, private authService : AuthService, private applicationStateService: ApplicationStateService) { }

  ngOnInit() {
    this.isMobile = this.applicationStateService.getIsMobileResolution();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.authService.currentUser.subscribe(x => this.currentUser = x);
    }
  }

  logout() {
    this.tokenStorageService.signOut();
     localStorage.removeItem('currentUser');
    window.location.reload();
  }

}