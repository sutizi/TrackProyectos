using System.Collections.Generic;

namespace TrackProyectosWebAPI.DTOs
{
    public class ProgramadorDTO
    {
        public int Id  { get; set; }

        public virtual IList<ProyectoDTO> Proyectos { get; set; }
    }
}
