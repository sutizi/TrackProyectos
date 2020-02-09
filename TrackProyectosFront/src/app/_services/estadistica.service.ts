import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EstadisticaDTO } from '../_models/EstadisticaDTO';


const API_URL = 'http://localhost:4000/Estadistica/';

@Injectable({
  providedIn: 'root'
})

export class EstadisticaService {
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
  };

  constructor(private http: HttpClient) {  }

  
  GetEstadisticaTodos(): Observable<EstadisticaDTO> {
    var item = JSON.parse(localStorage.getItem('currentUser'));
    var userId = item.id;
    return this.http.get<EstadisticaDTO>(API_URL + userId + "/proyecto/0" )
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = error.error.message;
    return throwError(errorMessage);
  }

  GetEstadisticaProyecto(idProyecto : number): Observable<EstadisticaDTO> {
    var item = JSON.parse(localStorage.getItem('currentUser'));
    var userId = item.id;
    return this.http.get<EstadisticaDTO>(API_URL + userId + "/proyecto/" + idProyecto )
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
