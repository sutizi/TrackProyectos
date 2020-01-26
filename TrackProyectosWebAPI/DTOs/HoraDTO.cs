using System;

namespace TrackProyectosWebAPI.DTOs
{
    public class HoraDTO
    {
        public int Id  { get; set; }

        public int Cantidad  { get; set; }

        public DateTime Dia { get; set; }
        
        public string Descripcion { get; set; }

        public int ProyectoID { get; set; }
    }
}