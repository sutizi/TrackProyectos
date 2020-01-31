using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrackProyectosWebAPI.Models
{
    public class Proyecto
    {
        [Key]
        public int Id  { get; set; }

        [Column(TypeName = "nvarchar(50)")] 
        [Required]
        public string Nombre { get; set; }

        [Column(TypeName = "nvarchar(500)")] 
        public string Descripcion { get; set; }

        [Column(TypeName = "date")]
        [Required]
        public DateTime FechaInicio { get; set; }

        [Column(TypeName = "date")]
        public DateTime FechaFinalizacion { get; set; }


        [Column(TypeName = "nvarchar(50)")] 
        public string Link  { get; set; }
        
        [Column(TypeName = "date")]
        public IList<Hora> Horas  { get; set; }

        [ForeignKey("Programador")]
        public int ProgramadorID { get; set; }

        [Column("IsDeleted", TypeName = "bit")]
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
    }
}
