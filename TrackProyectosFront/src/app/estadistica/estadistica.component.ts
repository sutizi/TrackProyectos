import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../_services/estadistica.service';
import * as CanvasJS from './canvasjs.min';
import { Chart } from 'canvasjs';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  Estadistica: any = [];

  horas: any = [];

  constructor(public restApi: EstadisticaService) { }

  ngOnInit() {
    //Cargo las estadisticas del backend e inicializo el grafico
	this.loadEstadistica();
}

  loadEstadistica() {
    return this.restApi.GetEstadistica().subscribe((data: {}) => {
	  this.Estadistica = data;
	  //Inicializo el arreglo de horas para el grafico
	  this.inicializarDatosGrafico();
	  //Inicializo el grafico
	  this.inicializarGrafico();
    })
  }

  inicializarGrafico() {

		let chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Basic Column Chart in Angular"
		},
		data: [{
			type: "column",
			dataPoints: [
				{ y: this.horas[6], label: "" },//hace 6 dias
				{ y: this.horas[5], label: "Mango" },//hace 5 dias
				{ y: this.horas[4], label: "Orange" },//hace 4 dias
				{ y: this.horas[3], label: "Banana" },//hace 3 dias
				{ y: this.horas[2], label: "Pineapple" }, //hace 2 dias
				{ y: this.horas[1], label: "Pears" },//hace 1 dia
				{ y: this.horas[0], label: new Date().getDate()+ "/" +new Date().getMonth() +1 +"/"+new Date().getUTCFullYear()},//hoy
			]
		}]
	});
		
	chart.render();
	}
	
	inicializarDatosGrafico()
	{
		for (let i = 0; i <7; i++)
			this.horas[i]  = 0;
		let dia = this.Estadistica.horasDTOSemana[0].dia;
		let i = 0;
		this.Estadistica.horasDTOSemana.forEach(hora =>
			{
			if (dia == hora.dia)
			{
				this.horas[i] = this.horas[i] + hora.cantidad;
			}
			else
			{
				dia = hora.dia;
				i++;
				this.horas[i] = this.horas[i] + hora.cantidad;
			}
			});

	}

}