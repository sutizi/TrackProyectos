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
        CreateMap<RegisterModel, RegisterModelDTO>().ReverseMap();
        CreateMap<UpdateModel, UpdateModelDTO>().ReverseMap();
        CreateMap<AuthenticateModel, AuthenticateModelDTO>().ReverseMap();
        
        CreateMap<UserModelDTO, User>().ReverseMap();
        CreateMap<RegisterModelDTO, User>().ReverseMap();
        CreateMap<UpdateModel, User>().ReverseMap();
        CreateMap<RegisterModel, User>().ReverseMap();


        CreateMap<Programador, ProgramadorDTO>().ReverseMap();

        CreateMap<Hora, HoraDTO>().ReverseMap();

        CreateMap<Programador, ProgramadorDTO>().ReverseMap();

        //CreateMap<IEnumerable<Proyecto>, IEnumerable<ProyectoDTO>>().ReverseMap();
         CreateMap<IList<Proyecto>, IList<ProyectoDTO>>().ReverseMap();
    }
}