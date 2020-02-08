import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, PreloadAllModules } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';

import { ProyectoCreateComponent } from './proyecto-create/proyecto-create.component';
import { ProyectoEditComponent } from './proyecto-edit/proyecto-edit.component';
import { AuthGuard } from './_helpers/auth.guard';
import { LoginComponentDesktop } from './login/login.component.desktop';
import { LoginComponentMobile } from './login/login.component.mobile';
import { ProyectoListComponentMobile } from './proyecto-list/proyecto-list.component.mobile';
import { ProyectoListComponentDesktop } from './proyecto-list/proyecto-list.component.desktop';
import { ApplicationStateService } from './_services/aplication-state.service';


const desktop_routes: Routes = [
  {path: 'login', component: LoginComponentDesktop },
  { path: 'proyecto-list', component: ProyectoListComponentDesktop, canActivate:[AuthGuard]},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'estadistica', component: EstadisticaComponent, canActivate:[AuthGuard]},
  { path: 'proyecto-create', component: ProyectoCreateComponent, canActivate:[AuthGuard] },
  { path: 'proyecto-edit/:id', component: ProyectoEditComponent, canActivate:[AuthGuard] },  
  { path: '', redirectTo: '/home', pathMatch: 'full' } ];

const mobile_routes: Routes = [
  {path: 'login', component: LoginComponentMobile },
  { path: 'proyecto-list', component: ProyectoListComponentMobile, canActivate:[AuthGuard] }
];

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'estadistica', component: EstadisticaComponent, canActivate:[AuthGuard]},
  { path: 'proyecto-create', component: ProyectoCreateComponent, canActivate:[AuthGuard] },
  { path: 'proyecto-edit/:id', component: ProyectoEditComponent, canActivate:[AuthGuard] },  
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  // as default we set the desktop routing configuration. if mobile will be started it will be replaced below.
  // note that we must specify some routes here (not an empty array) otherwise the trick below doesn't work...
  imports: [RouterModule.forRoot(desktop_routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {

  public constructor(private router: Router,
    private applicationStateService: ApplicationStateService) {

    if (applicationStateService.getIsMobileResolution()) {
      console.log(applicationStateService.getIsMobileResolution());
      router.resetConfig(mobile_routes);
    }
  }

  /**
   * this function inject new routes for the given module instead the current routes. the operation happens on the given current routes object so after
   * this method a call to reset routes on router should be called with the the current routes object.
   * @param currentRoutes
   * @param routesToInject
   * @param childNameToReplaceRoutesUnder - the module name to replace its routes.
   */
  private injectModuleRoutes(currentRoutes: Routes, routesToInject: Routes, childNameToReplaceRoutesUnder: string): void {
    for (let i = 0; i < currentRoutes.length; i++) {
      if (currentRoutes[i].loadChildren != null &&
        currentRoutes[i].loadChildren.toString().indexOf(childNameToReplaceRoutesUnder) != -1) {
        // we found it. taking the route prefix
        let prefixRoute: string = currentRoutes[i].path;
        // first removing the module line
        currentRoutes.splice(i, 1);
        // now injecting the new routes
        // we need to add the prefix route first
        this.addPrefixToRoutes(routesToInject, prefixRoute);
        for (let route of routesToInject) {
          currentRoutes.push(route);
        }
        // since we found it we can break the injection
        return;
      }

      if (currentRoutes[i].children != null) {
        this.injectModuleRoutes(currentRoutes[i].children, routesToInject, childNameToReplaceRoutesUnder);
      }
    }
  }

  private addPrefixToRoutes(routes: Routes, prefix: string) {
    for (let i = 0; i < routes.length; i++) {
      routes[i].path = prefix + '/' + routes[i].path;
    }
  }
 }

