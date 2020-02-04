import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Usuario } from '../_models/usuario';
import { catchError, map } from 'rxjs/operators';


const API_URL = 'http://localhost:4000/Users/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  actualizarUsuario(usuario):Observable<Usuario> {
    var item = JSON.parse(localStorage.getItem('currentUser'));
    var userId = item.id;
    return this.http.put<Usuario>(API_URL + userId, JSON.stringify(usuario), this.httpOptions).
    pipe(map(user => {
    //Se guardan las credenciales auth en local storage
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
   }));
    }
  
  getUsuario(): Observable<Usuario> {
    var item = JSON.parse(localStorage.getItem('currentUser'));
    var userId = item.id;
    return this.http.get<Usuario>(API_URL + userId)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage = error.error.message;
    return throwError(errorMessage);
  }
}