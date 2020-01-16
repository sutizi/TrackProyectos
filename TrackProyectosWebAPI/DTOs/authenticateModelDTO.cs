using System;
using System.ComponentModel.DataAnnotations;

namespace TrackProyectosWebAPI.DTOs
{ 
    public class AuthenticateModelDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}