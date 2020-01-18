using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrackProyectosWebAPI.Models
{
    public class Programador
    {
        //El id del programdor es el mismo que el id del user
        [Key]
        public int Id  { get; set; }

        public int nousar { get; set; }

        [Column(TypeName = "int")]
        public virtual IList<Proyecto> Proyectos { get; set; }
    }
}
