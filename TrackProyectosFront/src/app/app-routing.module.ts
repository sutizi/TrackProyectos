import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';

import { ProyectoCreateComponent } from './proyecto-create/proyecto-create.component';
import { ProyectoEditComponent } from './proyecto-edit/proyecto-edit.component';
import { ProyectoListComponent } from './proyecto-list/proyecto-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'estadistica', component: EstadisticaComponent },
  { path: 'proyecto-create', component: ProyectoCreateComponent },
  { path: 'proyecto-list', component: ProyectoListComponent },
  { path: 'proyecto-edit/:id', component: ProyectoEditComponent },  
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }