import { HoraDTO } from './HoraDTO';

export class EstadisticaDTO{

    cantidadProyectos: number;
    cantidadProyectosTermiandos: number;
    horasMes: number;
    horasTotales: number;
    horasSemana: number;
    horasDTOSemana: Array<HoraDTO>;
    horasDiarias: Array<number>;
    
}