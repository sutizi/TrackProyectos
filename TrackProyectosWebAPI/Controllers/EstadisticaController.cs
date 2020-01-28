
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackProyectosWebAPI.DTOs;
using TrackProyectosWebAPI.Models;

namespace TrackProyectos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]  
    public class EstadisticaController : ControllerBase
    {
        private readonly APIDBContext _context;
        private readonly IMapper _mapper;

        
        public EstadisticaController (APIDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

    
        /*
            Retorna el las estadisticas correspondientes al id recibido
            params: id: id del usuario que se quiere obtener las estadisticas
        */
        [HttpGet("{id}")]
        [Authorize]
        //GET :/Estadistica/:id
        public async Task<ActionResult<EstadisticaDTO>> GetEstadistica(int id)
        {
            var programador = await _context.Programadores.Include(t => t.Proyectos).ThenInclude(p => p.Horas).FirstOrDefaultAsync(x => x.Id==id);

            if (programador == null)
            {
                return NotFound();
            }
            
            var proyectos = programador.Proyectos;

            //Unifico todas las horas en una sola lista
            var horas = programador.GetHoras(proyectos);

            var hoy = DateTime.Today;
            var primerDia = DateTime.Today.AddDays(-7);

            //Creo el dto de estadistica e inicializo todos sus atributos
            EstadisticaDTO estadisticaDTO = new EstadisticaDTO()
            {
                CantidadProyectos = proyectos.Count(),
                CantidadProyectosTermiandos = proyectos.Count(x => x.FechaFinalizacion != null && x.FechaFinalizacion <= DateTime.Today),
                HorasTotales = horas.Sum(x => x.Cantidad),
                HorasMes = horas.Where(x => x.Dia.Month == DateTime.Today.Month).Sum(x => x.Cantidad),
                HorasDTOSemana = _mapper.Map<IEnumerable<Hora>, IList<HoraDTO>> (horas.Where(x => x.Dia >= primerDia && x.Dia <= hoy))
                
            };
            return estadisticaDTO;
        }
    }
}
