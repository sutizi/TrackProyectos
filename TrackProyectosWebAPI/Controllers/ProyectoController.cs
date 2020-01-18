
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


        /*
            Crea un nuevo proyecto
        */
        [HttpPost]
        //POST :/Proyecto/
        public async Task<ActionResult<ProyectoDTO>> PostProyecto(ProyectoDTO proyectoDTO)
        {
            var proyecto = _mapper.Map<Proyecto>(proyectoDTO);

            _context.Proyectos.Add(proyecto);

            await _context.SaveChangesAsync();

            return CreatedAtAction("ProyectoDTO", new { id = proyectoDTO.Id }, proyectoDTO);
        }

        /*
            Permite editar un proyecto
            params: id: id del proyecto que se quiere editar
        */
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBankAccount(int id, ProyectoDTO proyecto)
        {

            _context.Entry(proyecto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                    throw;
            }

            return NoContent();
        }

        /*
            Elimina el proyecto especificado y lo retorna
            params: id: id del proyecto que se desea eliminar
        */
        // DELETE: Proyecto/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProyectoDTO>> DeleteBankAccount(int id)
        {
            var proyecto = await _context.Proyectos.FindAsync(id);
            if (proyecto == null)
            {
                return NotFound();
            }

            _context.Proyectos.Remove(proyecto);
            await _context.SaveChangesAsync();

            return _mapper.Map<ProyectoDTO>(proyecto);
        }
    }
}
