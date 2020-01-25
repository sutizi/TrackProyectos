using System;

namespace TrackProyectosWebAPI.DTOs
{
    public class ProyectoDTO
    {

        public int Id  { get; set; }

        public string Nombre { get; set; }

        public string Descripcion { get; set; }

        public DateTime FechaInicio { get; set; }

        public DateTime FechaFinalizacion { get; set; }
        
        public string Link  { get; set; }

        public int ProgramadorID { get; set; }
    }
}
