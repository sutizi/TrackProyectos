import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../_services/estadistica.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  Estadistica: any = [];

  constructor(public restApi: EstadisticaService) { }

  ngOnInit() {
    this.loadEstadistica();
  }

  loadEstadistica() {
    return this.restApi.GetEstadistica().subscribe((data: {}) => {
      this.Estadistica = data;
    })
  }

}