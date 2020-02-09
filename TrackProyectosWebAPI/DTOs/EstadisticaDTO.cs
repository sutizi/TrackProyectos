using System.Collections.Generic;

namespace TrackProyectosWebAPI.DTOs
{
    public class EstadisticaDTO
    {
        public int CantidadProyectos  { get; set; }

        public int CantidadProyectosTermiandos { get; set; }
        public int HorasMes { get; set; }

        public int HorasSemana { get; set; }

        public int HorasTotales { get; set; }

        //Lista con las horasDTO de la ultima semana
        public IList<HoraDTO> HorasDTOSemana { get; set; }

        //Lista de 7 enteros donde cada uno representa la cantidad de horas trabajadas durante 
        //un dia de la ultima semana
        public IList<int> HorasDiarias { get; set; }

    }
}