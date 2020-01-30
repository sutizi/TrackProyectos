import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../_models/usuario';
import { catchError } from 'rxjs/operators';


const API_URL = 'http://localhost:4000/Users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
  };


  constructor(private http: HttpClient) { }


actualizarUsuario(usuario): Observable<Usuario> {
  var item = JSON.parse(localStorage.getItem('currentUser'));
  var userId = item.id;
  return this.http.put<Usuario>(API_URL + userId, JSON.stringify(usuario), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}