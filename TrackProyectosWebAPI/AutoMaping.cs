using AutoMapper;
using TrackProyectosWebAPI.DTOs;
using TrackProyectosWebAPI.Models;

public class AutoMapping : Profile
{
    public AutoMapping()
    {
        CreateMap<Proyecto, ProyectoDTO>().ReverseMap();
    }
}