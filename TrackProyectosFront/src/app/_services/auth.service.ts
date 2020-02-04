import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Usuario } from '../_models/usuario';

const AUTH_API = 'http://localhost:4000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  login(credentials): Observable<any> {
    console.log("11");
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
    console.log("99");
    return this.http.post(AUTH_API + 'Users/register', {
      email: user.email,
      password: user.password,
      username: user.username
    }, httpOptions).pipe(map(user => {
      // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log("77");
      return user;
     }));
  }
}