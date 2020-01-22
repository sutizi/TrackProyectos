import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// Routing module for router service
import { AppRoutingModule } from './app-routing.module';
// Forms module
import { FormsModule } from '@angular/forms';
// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { ProfileComponent } from './profile/profile.component';
import { ProyectoService } from './_services/proyecto.service';
import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { ProyectoCreateComponent } from './proyecto-create/proyecto-create.component';
import { ProyectoEditComponent } from './proyecto-edit/proyecto-edit.component';
import { ProyectoListComponent } from './proyecto-list/proyecto-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardUserComponent,
    ProfileComponent,
    EstadisticaComponent,
    ProyectoCreateComponent,
    ProyectoEditComponent,
    ProyectoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders, ProyectoService],
  bootstrap: [AppComponent]
})
export class AppModule { }