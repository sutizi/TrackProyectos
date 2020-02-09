
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
        [HttpGet("{idProgramador}/proyecto/{idProyecto}")]
        [Authorize]
        //GET :/Estadistica/:id
        public async Task<ActionResult<EstadisticaDTO>> GetEstadistica(int idProgramador, int idProyecto)
        {
            var programador = await _context.Programadores.Include(t => t.Proyectos).ThenInclude(p => p.Horas).FirstOrDefaultAsync(x => x.Id==idProgramador);

            if (programador == null)
            {
                return NotFound();
            }
            
            var proyectos = programador.Proyectos.Where(x => !x.IsDeleted).ToList();

            //Unifico todas las horas en una sola lista
            var horas = programador.GetHoras(proyectos).ToList();
            horas = idProyecto > 0 ? horas.Where(x => x.ProyectoID == idProyecto).ToList() : horas;

            var hoy = DateTime.Today;
            var primerDia = DateTime.Today.AddDays(-7);

            IList<HoraDTO> horasDTOSemana = new List<HoraDTO>();
            IList<int> horasPorDia = new List<int>();

            horasDTOSemana = _mapper.Map<IEnumerable<Hora>, IList<HoraDTO>> (horas.Where(x => x.Dia >= primerDia && x.Dia <= hoy).OrderBy(x => x.Dia));
            horasPorDia = calcularHorasPorDia(horasDTOSemana);

            //Creo el dto de estadistica e inicializo todos sus atributos
            EstadisticaDTO estadisticaDTO = new EstadisticaDTO()
            {
                CantidadProyectos = proyectos.Count(),
                CantidadProyectosTermiandos = proyectos.Count(x => x.FechaFinalizacion != null && x.FechaFinalizacion <= DateTime.Today),
                HorasTotales = horas.Sum(x => x.Cantidad),
                HorasMes = horas.Where(x => x.Dia.Month == DateTime.Today.Month).Sum(x => x.Cantidad),
                HorasSemana = horas.Where(x => x.Dia >= primerDia && x.Dia <= hoy).Sum(x => x.Cantidad),
                HorasDTOSemana = horasDTOSemana,
                HorasDiarias = horasPorDia
            };
            return estadisticaDTO;
        }

        private IList<int> calcularHorasPorDia(IList<HoraDTO> horas)
        {
            var aRet = new List<int>();

            var dia = DateTime.Today;

            for(int i = 0; i <7; i++)
            {
                aRet.Add(horas.Where(x => x.Dia == dia).Sum(x => x.Cantidad));
                dia = dia.AddDays(-1);
            }

            return aRet;
        }
    }
}
