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
        CreateMap<RegisterModel, RegisterDTO>().ReverseMap();
        CreateMap<UpdateModel, UpdateDTO>().ReverseMap();
        CreateMap<AuthenticateModel, AuthenticateModelDTO>().ReverseMap();
        
        CreateMap<UserDTO, User>().ReverseMap();
        CreateMap<RegisterDTO, User>().ReverseMap();
        CreateMap<UpdateModel, User>().ReverseMap();
        CreateMap<RegisterModel, User>().ReverseMap();


        CreateMap<Programador, ProgramadorDTO>().ReverseMap();

        CreateMap<Hora, HoraDTO>().ReverseMap();

        CreateMap<Programador, ProgramadorDTO>().ReverseMap();

         CreateMap<IList<Proyecto>, IList<ProyectoDTO>>().ReverseMap();
    }
}