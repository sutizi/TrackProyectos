export class ProyectoDTO{
    
    id: number;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFinalizacion: Date;
    link: string;
    programadorID: number;

constructor() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.link = '';
    this.programadorID = 0;
}

public clone(): ProyectoDTO {
    let clonedModel: ProyectoDTO = new ProyectoDTO();
    clonedModel.id = this.id;

    return clonedModel;
  }

}