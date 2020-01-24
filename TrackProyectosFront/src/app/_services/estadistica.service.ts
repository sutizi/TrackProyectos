import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
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

  
  
  GetEstadistica(): Observable<EstadisticaDTO> {
    var item = JSON.parse(localStorage.getItem('currentUser'));
    var userId = item.id;
    return this.http.get<EstadisticaDTO>(API_URL + userId)
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
