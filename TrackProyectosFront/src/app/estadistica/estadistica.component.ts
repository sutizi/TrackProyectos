import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../_services/estadistica.service';
import * as CanvasJS from './canvasjs.min';
import { ProyectoService } from '../_services/proyecto.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  Estadistica: any = [];

  horas: any = [];

  todasLasEstadisticas = false;

  Proyecto : any = [];

  constructor(private restApi: EstadisticaService, private restApiProyectos: ProyectoService) { }

  ngOnInit() {
	//Cargo la lista de proyectos
	this.loadProyectos();
	this.loadEstadisticaTodos();
	
}

  loadEstadisticaTodos() {
	this.todasLasEstadisticas = true;
    return this.restApi.GetEstadisticaTodos().subscribe((data: {}) => {
	  this.Estadistica = data;
	  document.getElementById('dropdownMenu2').innerHTML = "Todos";
	  //Inicializo el arreglo de horas para el grafico
	  //El grafico se inicializa solo si hay horas en esta semana
	  if(this.Estadistica.horasDiarias != undefined)
	  {
		//Inicializo el grafico
		this.inicializarGrafico();
	  }
    })
  }

  loadEstadisticaProyecto(idProyecto : number, nombre: string) {
	this.todasLasEstadisticas = false;
    return this.restApi.GetEstadisticaProyecto(idProyecto).subscribe((data: {}) => {
	  this.Estadistica = data;
	  document.getElementById('dropdownMenu2').innerHTML = nombre;
	  //Inicializo el arreglo de horas para el grafico
	  //El grafico se inicializa solo si hay horas en esta semana
		//Inicializo el grafico
		if(this.Estadistica.horasDiarias != undefined)
		{
		  //Inicializo el grafico
		  this.inicializarGrafico();
		}

    })
  }

  /**
   * Obtiene la lista de todos los proyectos del usuario
   */
  loadProyectos() {
    return this.restApiProyectos.getProyectos().subscribe((data: {}) => {
      this.Proyecto = data;
    })
  }

  inicializarGrafico() {

		let fechas =  this.fechasSemanaPasada();

		let chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		data: [{
			type: "column",
			dataPoints: [
				{ y: this.Estadistica.horasDiarias[6], label: fechas[5].getDate() +"/"+ (fechas[5].getMonth()+1) +"/"+ fechas[5].getFullYear()},//hace 6 dias
				{ y: this.Estadistica.horasDiarias[5], label: fechas[4].getDate() +"/"+ (fechas[4].getMonth()+1) +"/"+ fechas[4].getFullYear()},//hace 5 dias
				{ y: this.Estadistica.horasDiarias[4], label: fechas[3].getDate() +"/"+ (fechas[3].getMonth()+1) +"/"+ fechas[3].getFullYear() },//hace 4 dias
				{ y: this.Estadistica.horasDiarias[3], label: fechas[2].getDate() +"/"+ (fechas[2].getMonth()+1) +"/"+ fechas[2].getFullYear()},//hace 3 dias
				{ y: this.Estadistica.horasDiarias[2], label: fechas[1].getDate() +"/"+ (fechas[1].getMonth()+1) +"/"+ fechas[1].getFullYear()}, //hace 2 dias
				{ y: this.Estadistica.horasDiarias[1], label: fechas[0].getDate() +"/"+ (fechas[0].getMonth()+1) +"/"+ fechas[0].getFullYear()},//hace 1 dia
				{ y: this.Estadistica.horasDiarias[0], label: new Date().getDate()+ "/"+ (new Date().getMonth()+1) +"/"+new Date().getUTCFullYear()},//hoy
			]
		}]
	});
		
	chart.render();
	}

	fechasSemanaPasada(){
		let hoy = new Date();
		let milisegundosPorDia = 1000 * 60 * 60 * 24;
	
		let hace1dia = hoy.getTime() - milisegundosPorDia; 
		let hace2dias = hoy.getTime() - (2*milisegundosPorDia); 
		let hace3dias = hoy.getTime() - (3*milisegundosPorDia); 
		let hace4dias = hoy.getTime() - (4*milisegundosPorDia); 
		let hace5dias = hoy.getTime() - (5*milisegundosPorDia); 
		let hace6dias = hoy.getTime() - (6*milisegundosPorDia); 

		let fechahace1dia = new Date(hace1dia);
		let fechahace2dias = new Date(hace2dias);
		let fechahace3dias = new Date(hace3dias);
		let fechahace4dias = new Date(hace4dias);
		let fechahace5dias = new Date(hace5dias);
		let fechahace6dias = new Date(hace6dias);

		var fechasSemanaPasada = [fechahace1dia,fechahace2dias,fechahace3dias,fechahace4dias,fechahace5dias,fechahace6dias];
		return fechasSemanaPasada;
	}

}