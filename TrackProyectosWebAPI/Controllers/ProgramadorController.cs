
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackProyectosWebAPI.DTOs;

namespace TrackProyectos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]  
    public class ProgramadorController : ControllerBase
    {
        private readonly APIDBContext _context;
        private readonly IMapper _mapper;
        
        public ProgramadorController (APIDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet("{id}")]
        //GET :/Programador/:id
        public async Task<ActionResult<ProgramadorDTO>> GetProgramador(int id)
        {
            var programador = await _context.Programadores.Include(t => t.Proyectos).FirstOrDefaultAsync(x => x.Id==id);

            if (programador == null)
                return NotFound();

            return _mapper.Map<ProgramadorDTO>(programador);
        }
    }
}
