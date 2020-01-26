
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
    public class HoraController : ControllerBase
    {
        private readonly APIDBContext _context;
        private readonly IMapper _mapper;
        
        public HoraController (APIDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

    
        /*
            Crea un nuevo nuevas horas trabajadas
        */
        [HttpPost]
        //POST :/Hora/
        public async Task<ActionResult<HoraDTO>> PostHora(HoraDTO horaDTO)
        {
            var hora = _mapper.Map<Hora>(horaDTO);

            _context.Horas.Add(hora);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
