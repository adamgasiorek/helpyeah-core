import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotLoggedGuard} from "@core/guards/not-logged/not-logged.guard";
import {LoggedGuard} from "@core/guards/logged/logged.guard";
import {AdminGuard} from "@core/guards/admin/admin.guard";
import {AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["home"]);
const redirectLoggedInToMain = () => redirectLoggedInTo([""]);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/landpage/landpage.module').then((m) => m.LandpageModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
    // canLoad: [AdminGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToMain }
  },
  {
    path: '',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
