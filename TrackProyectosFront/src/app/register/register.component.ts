import { Component , OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = 'Error';

  constructor(private authService: AuthService,  private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      () => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.authService.login(this.form).subscribe(
          data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
          },  err => {
            this.errorMessage = err;
          });
      },
      err => {
       this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}