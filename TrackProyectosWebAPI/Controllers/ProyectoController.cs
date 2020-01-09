using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TrackProyectosWebAPI.Models;

namespace TrackProyectos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]  
    public class ProyectoController : ControllerBase
    {
        private readonly APIDBContext _context;
        
        public ProyectoController (APIDBContext context)
        {
            _context = context;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Proyecto>> GetProyecto(int id)
        {
            var proyecto = await _context.Proyectos.FindAsync(id);

            if (proyecto == null)
                return NotFound();

            return proyecto;
        }
    }
}
