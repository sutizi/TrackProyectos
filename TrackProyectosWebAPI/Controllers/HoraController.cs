
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        [Authorize]
        [HttpPost]
        //POST :/Hora/
        public async Task<ActionResult<HoraDTO>> PostHora(HoraDTO horaDTO)
        {
            var hora = _mapper.Map<Hora>(horaDTO);

            if(hora.Cantidad <= 0 || hora.Cantidad > 24)
            {
                return BadRequest(new {message = "La cantidad de horas debe ser mayor a cero y menor a 24"});
            }

            if(hora.Dia == null)
            {
                return BadRequest(new {message = "Debe especificar la fecha"});
            }

            _context.Horas.Add(hora);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
