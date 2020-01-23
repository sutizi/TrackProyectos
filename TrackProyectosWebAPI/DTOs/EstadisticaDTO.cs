using System;

namespace TrackProyectosWebAPI.DTOs
{
    public class EstadisticaDTO
    {
        public int CantidadProyectos  { get; set; }

        public int CantidadProyectosTermiandos { get; set; }
        public int HorasMes { get; set; }

        public int HorasTotales { get; set; }

    }
}