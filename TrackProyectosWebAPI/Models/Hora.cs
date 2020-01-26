using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrackProyectosWebAPI.Models
{
    public class Hora
    {
        [Key]
        public int Id  { get; set; }

        [Required]
        public int Cantidad  { get; set; }

        [Column(TypeName = "date")]
        [Required]
        public DateTime Dia { get; set; }

        [Column(TypeName = "nvarchar(500)")] 
        public string Descripcion { get; set; }

        [ForeignKey("Proyecto")]
        public int ProyectoID { get; set; }

    }
}
