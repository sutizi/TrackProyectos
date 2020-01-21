import { Component , OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { observable, throwError } from 'rxjs'; 


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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
       console.log('Try Favorite - ', err.message);
       //this.errorMessage = err.error.message;
       throwError(err.message || err);
       
        this.isSignUpFailed = true;
      }
    );
  }
}