using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace TrackProyectosWebAPI.Models
{
    public class Programador
    {
        //El id del programdor es el mismo que el id del user
        [Key]
        public int Id  { get; set; }

        [Column(TypeName = "int")]
        public virtual IList<Proyecto> Proyectos { get; set; }


        /*
            Retorna las horas correspondientes al programador actual
        */
        public IList<Hora> GetHoras()
        {
            List<Hora> horas = new List<Hora>();
            foreach (var proyecto in this.Proyectos)
            {
                horas.Concat(proyecto.Horas);
            }
            return horas;
        }
    }

}
