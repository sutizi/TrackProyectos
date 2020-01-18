
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackProyectosWebAPI.DTOs;
using TrackProyectosWebAPI.Models;

namespace TrackProyectos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]  
    public class ProyectoController : ControllerBase
    {
        private readonly APIDBContext _context;
        private readonly IMapper _mapper;
        
        public ProyectoController (APIDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /*
            Retorna el proyecto que corresponde con el id recibido
            params: id: id del proyecto que se quiere obtener
        */
        [HttpGet("{id}")]
        //GET :/Proyecto/:id
        public async Task<ActionResult<ProyectoDTO>> GetProyecto(int id)
        {
            var proyecto = await _context.Proyectos.FindAsync(id);

            if (proyecto == null)
                return NotFound();

            return _mapper.Map<ProyectoDTO>(proyecto);
        }

         /*
            Retorna la lista de proyectos del programador especificado
            params: id: id del proyecto que se quiere obtener
        */
        [HttpGet("byProgramador/{id}")]
        //GET :/Proyecto/byProgramador:id
        public async Task<ActionResult<IEnumerable<ProyectoDTO>>> GetProyectosByProgramador(int id)
        {
            var programador = await _context.Programadores.Include(t => t.Proyectos).FirstOrDefaultAsync(x => x.Id==id);

            if (programador == null)
            {
                return NotFound();
            }
            var proyectos = _mapper.Map<IEnumerable<Proyecto>, IEnumerable<ProyectoDTO>>(programador.Proyectos).ToList();

            return proyectos;
        }
    }
}
