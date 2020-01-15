
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TrackProyectosWebAPI.Models;
using TrackProyectosWebAPI.DTOs;
using System.Threading.Tasks;
using System;
using AutoMapper;
using System.Security.Claims;

namespace TrackProyectos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]  
    public class UsuarioController : ControllerBase
    {
        private UserManager<Usuario> _userManager;
        private SignInManager<Usuario> _sigInManager;
        private readonly IMapper _mapper;
        private readonly APIDBContext _context;

        public UsuarioController(UserManager<Usuario> userManager, SignInManager<Usuario> sigInManager, APIDBContext context, IMapper mapper)
        {
            _userManager = userManager;
            _sigInManager = sigInManager;
            _context = context;
            _mapper = mapper;
            
        }

        [HttpPost]
        [Route("Registrar")]
        //POST :/Usuario/Registrar
        public async Task<ActionResult<UsuarioDTO>> PostUsuario(UsuarioModel model)
        {
            var usuario = new Usuario() {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName
            };    
            try
            {
                var result = await _userManager.CreateAsync(usuario, model.Password);
               // var result2 = await _context.Usuarios.AddAsync(result);
                return _mapper.Map<UsuarioDTO>(result);
            }
            catch(Exception ex) {
                throw ex;
            }
        }

       
    }

}