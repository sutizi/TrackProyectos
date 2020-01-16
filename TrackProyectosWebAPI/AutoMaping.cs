using AutoMapper;
using TrackProyectosWebApi.DTOs;
using TrackProyectosWebAPI.DTOs;
using TrackProyectosWebAPI.Models;
using TrackProyectosWebAPI.Models.Users;

public class AutoMapping : Profile
{
    public AutoMapping()
    {
        CreateMap<Proyecto, ProyectoDTO>().ReverseMap();
        CreateMap<User, UserDTO>().ReverseMap();
        CreateMap<RegisterModel, User>().ReverseMap();
        CreateMap<UpdateModel, User>().ReverseMap();
    }
}