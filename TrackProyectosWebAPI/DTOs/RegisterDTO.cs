using System.ComponentModel.DataAnnotations;

namespace TrackProyectosWebAPI.DTOs
{
    public class RegisterDTO
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}