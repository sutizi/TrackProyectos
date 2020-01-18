using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TrackProyectosWebAPI.Models;
using TrackProyectosWebAPI.Models.Users;

namespace TrackProyectos
{
    public class APIDBContext : DbContext
    {
        protected readonly IConfiguration _configuracion;

        public APIDBContext(IConfiguration configuracion)
        {
            _configuracion = configuracion;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server database
            options.UseSqlServer(_configuracion.GetConnectionString("WebApiDatabase"));
        }

        public DbSet<Proyecto> Proyectos { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Programador> Programadores { get; set; }

        public DbSet<Hora> Horas { get; set; }
    }
}