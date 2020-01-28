using System.ComponentModel.DataAnnotations;

namespace TrackProyectosWebAPI.DTOs
{
    public class AuthenticateDTO
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }
}