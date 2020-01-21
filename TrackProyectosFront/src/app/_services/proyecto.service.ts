import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Proyecto } from '../_models/proyecto';

const API_URL = 'http://localhost:4000/Proyecto/'; //test

@Injectable({
  providedIn: 'root'
})

export class ProyectoService {
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
  };

  constructor(private http: HttpClient) {  }

  
  //PROYECTOS POR PROGRAMADOR 
  getProyectos(id: number): Observable<Proyecto[]> {
    var item = JSON.parse(localStorage.getItem('currentUser'));
    var userId = item.id;
    return this.http.get<Proyecto[]>(API_URL+'byProgramador/' + userId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveProyecto(proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(API_URL, JSON.stringify(proyecto), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateProyecto(id: number, proyecto): Observable<Proyecto> {
    return this.http.put<Proyecto>(API_URL + id, JSON.stringify(proyecto), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteProyecto(id: number): Observable<Proyecto> {
    return this.http.delete<Proyecto>(API_URL + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
