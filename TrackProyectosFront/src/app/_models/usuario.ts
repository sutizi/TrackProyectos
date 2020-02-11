import { DomSanitizer } from '@angular/platform-browser';

export class Usuario {
    id: number;
    email: string;
    username: string;
    password: string;
    token?: string;


    constructor() {
        this.id = 0;
        this.email = '';
        this.username = '';
        this.password = '';
        this.token = '';
    }

    public clone(): Usuario {
        let clonedModel: Usuario = new Usuario();
        clonedModel.id = this.id;
        clonedModel.email = this.email;
        clonedModel.username = this.username;
        clonedModel.password = this.password;
        clonedModel.token = this.token;

        return clonedModel;
      }
}