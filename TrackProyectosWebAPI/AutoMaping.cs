using System.Collections.Generic;
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
        CreateMap<AuthenticateModel, AuthenticateDTO>().ReverseMap();
        CreateMap<UserDTO, User>().ReverseMap();
        CreateMap<RegisterDTO, User>().ReverseMap();
        CreateMap<UpdateDTO, User>().ReverseMap();

        CreateMap<Programador, ProgramadorDTO>().ReverseMap();

        CreateMap<Hora, HoraDTO>().ReverseMap();

         CreateMap<IList<Proyecto>, IList<ProyectoDTO>>().ReverseMap();
    }
}