using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrackProyectosWebAPI.Models
{
    public class Proyecto
    {
        [Key]
        public int Id  { get; set; }

        [Column(TypeName = "nvarchar(30)")] 
        [Required]
        public string Nombre { get; set; }

        [Column(TypeName = "nvarchar(200)")] 
        public string Descripcion { get; set; }

        [Column(TypeName = "date")]
        [Required]
        public DateTime FechaInicio { get; set; }

        [Column(TypeName = "date")]
        public DateTime FechaFinalizacion { get; set; }

        public string Link  { get; set; }
    }
}
