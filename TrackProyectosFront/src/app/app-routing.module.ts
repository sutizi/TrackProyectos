import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';

import { ProyectoCreateComponent } from './proyecto-create/proyecto-create.component';
import { ProyectoEditComponent } from './proyecto-edit/proyecto-edit.component';
import { ProyectoListComponent } from './proyecto-list/proyecto-list.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'estadistica', component: EstadisticaComponent, canActivate:[AuthGuard]},
  { path: 'proyecto-create', component: ProyectoCreateComponent, canActivate:[AuthGuard] },
  { path: 'proyecto-list', component: ProyectoListComponent, canActivate:[AuthGuard] },
  { path: 'proyecto-edit/:id', component: ProyectoEditComponent, canActivate:[AuthGuard] },  
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }