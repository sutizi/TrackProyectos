import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Forms module
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProyectoService } from './_services/proyecto.service';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { ProyectoCreateComponent } from './proyecto-create/proyecto-create.component';
import { ProyectoEditComponent } from './proyecto-edit/proyecto-edit.component';
import { ProyectoListComponent } from './proyecto-list/proyecto-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PerfilComponent,
    EstadisticaComponent,
    ProyectoCreateComponent,
    ProyectoEditComponent,
    ProyectoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [authInterceptorProviders, ProyectoService],
  bootstrap: [AppComponent]
})
export class AppModule { }