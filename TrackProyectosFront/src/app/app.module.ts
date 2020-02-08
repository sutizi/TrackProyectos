import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Forms module
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponentDesktop } from './login/login.component.desktop';
import { LoginComponentMobile } from './login/login.component.mobile';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProyectoService } from './_services/proyecto.service';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { ProyectoCreateComponent } from './proyecto-create/proyecto-create.component';
import { ProyectoEditComponent } from './proyecto-edit/proyecto-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProyectoListComponentDesktop } from './proyecto-list/proyecto-list.component.desktop';
import { ProyectoListComponentMobile } from './proyecto-list/proyecto-list.component.mobile';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentDesktop,
    LoginComponentMobile,
    RegisterComponent,
    HomeComponent,
    PerfilComponent,
    EstadisticaComponent,
    ProyectoCreateComponent,
    ProyectoEditComponent,
    ProyectoListComponentMobile,
    ProyectoListComponentDesktop
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [authInterceptorProviders, ProyectoService],
  bootstrap: [AppComponent],
  entryComponents: [ProyectoListComponentMobile, LoginComponentMobile]
})
export class AppModule { }