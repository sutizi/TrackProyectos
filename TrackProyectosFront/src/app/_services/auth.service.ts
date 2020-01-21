import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

const AUTH_API = 'http://localhost:4000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'Users/authenticate', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions).pipe(map(user => {
           // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
           localStorage.setItem('currentUser', JSON.stringify(user));
           return user;
          }));
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'Users/register', {
      email: user.email,
      password: user.password,
      username: user.username
    }, httpOptions)
  }
}