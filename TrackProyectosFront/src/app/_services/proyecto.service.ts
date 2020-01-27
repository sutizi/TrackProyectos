import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ProyectoDTO } from '../_models/ProyectoDTO';
import { HoraDTO } from '../_models/HoraDTO';

const API_URL = 'http://localhost:4000/Proyecto/';

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
  getProyectos(): Observable<ProyectoDTO[]> {
    var item = JSON.parse(localStorage.getItem('currentUser'));
    var userId = item.id;
    return this.http.get<ProyectoDTO[]>(API_URL+'byProgramador/' + userId)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  saveProyecto(proyecto): Observable<ProyectoDTO> {
    return this.http.post<ProyectoDTO>(API_URL, JSON.stringify(proyecto), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateProyecto(id: number, proyecto): Observable<ProyectoDTO> {
    return this.http.put<ProyectoDTO>(API_URL + id, JSON.stringify(proyecto), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteProyecto(id: number): Observable<ProyectoDTO> {
    return this.http.delete<ProyectoDTO>(API_URL + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  saveHoras(hora): Observable<HoraDTO> {
    return this.http.post<HoraDTO>('http://localhost:4000/Hora/', JSON.stringify(hora), this.httpOptions)
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
