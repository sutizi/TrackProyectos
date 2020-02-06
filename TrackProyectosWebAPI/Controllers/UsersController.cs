using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TrackProyectosWebAPI.DTOs;
using TrackProyectosWebAPI.Models.Users;
using TrackProyectosWebAPI.Services;
using WebApi.Helpers;
using System.Linq;
using TrackProyectosWebApi.DTOs;

namespace TrackProyectos.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        private readonly APIDBContext _context;

        public UsersController(IUserService userService, IMapper mapper, IOptions<AppSettings> appSettings, APIDBContext context)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _context = context;
        }
        
        /*
        * Permite autenticar al usuaioDTO verificando usuario y contraseña
        */
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateDTO usuarioDTO)
        {
            var usuarioModel = _mapper.Map<AuthenticateModel>(usuarioDTO);
            var usuario = _userService.Authenticate(usuarioModel.Username, usuarioModel.Password);

            if (usuario == null)
                return BadRequest(new { message = "Usuario y/o contraseña incorectos" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, usuario.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Se retorna la informacion del usuario y su token
            return Ok(new
            {
                Id = usuario.Id,
                Username = usuario.Username,
                Token = tokenString
            });
        }

        /*
        * Registra el nuevo usario recibido
        */
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterDTO nuevoDTO)
        {
            var usuario = _mapper.Map<User>(nuevoDTO);
            
           //Control: username unico
            if(_context.Users.Any(x => x.Username == nuevoDTO.Username))
            {
                return BadRequest(new {message = "El usermane especificado ya no se encuentra disponible"});
            }

            //Control: email unico
            if(_context.Users.Any(x => x.Email == nuevoDTO.Email))
            {
                return BadRequest(new {message = "El email especificado ya se encuentra registrado"});
            }

             // crear usuario	
            _userService.Create(usuario, nuevoDTO.Password);	
        
            return Ok();
            }

 
        /*
        * Actualiza el usuario con el usuarioDTO recibido
        */
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UpdateDTO nuevoDTO)
        {
            var usuario = _mapper.Map<User>(nuevoDTO);

            //Seteo el id al DTO
            usuario.Id = id;
            //Control: username unico

            if(_context.Users.Any(x => x.Username == nuevoDTO.Username && x.Id!= usuario.Id))
            {
                return BadRequest(new {message = "El usermane especificado ya no se encuentra disponible"});
            }

            //Control: email unico
            if(_context.Users.Any(x => x.Email == nuevoDTO.Email && x.Id!= usuario.Id))
            {
                return BadRequest(new {message = "El email especificado ya se encuentra registrado"});
            }

            _userService.Update(usuario, nuevoDTO.Password);
        
            return Ok();
       }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            var model = _mapper.Map<UserDTO>(user);
            return Ok(model);
        }
    }
}
