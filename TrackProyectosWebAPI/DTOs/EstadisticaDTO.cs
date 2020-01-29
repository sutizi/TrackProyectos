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

        public IList<HoraDTO> HorasDTOSemana { get; set; }

    }
}