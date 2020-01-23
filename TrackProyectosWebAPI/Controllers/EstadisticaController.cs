
using System;
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
        //GET :/Estadistica/:id
        public async Task<ActionResult<EstadisticaDTO>> GetEstadistica(int id)
        {
            var programador = await _context.Programadores.FindAsync(id);

            if (programador == null)
                return NotFound();
            
            var proyectos = programador.Proyectos;

            var horas = programador.GetHoras();

            //Creo el dto de estadistica e inicializo todos sus atributos
            EstadisticaDTO estadisticaDTO = new EstadisticaDTO()
            {
                CantidadProyectos = proyectos.Count(),
                CantidadProyectosTermiandos = proyectos.Count(x => x.FechaFinalizacion != null && x.FechaFinalizacion <= DateTime.Today),
                HorasTotales = horas.Sum(x => x.Cantidad),
                HorasMes = horas.Where(x => x.Dia.Month == DateTime.Today.Month).Sum(x => x.Cantidad)
            };

            return estadisticaDTO;
        }
    }
}
