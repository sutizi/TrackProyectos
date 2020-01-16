
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TrackProyectosWebAPI;
using TrackProyectosWebAPI.DTOs;

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


        [HttpGet("{id}")]
        //GET :/Proyecto/:id
        public async Task<ActionResult<ProyectoDTO>> GetProyecto(int id)
        {
            var proyecto = await _context.Proyectos.FindAsync(id);

            if (proyecto == null)
                return NotFound();

            return _mapper.Map<ProyectoDTO>(proyecto);
        }
    }
}
