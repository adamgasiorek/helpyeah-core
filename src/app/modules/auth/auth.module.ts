import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {RouterModule, Routes} from "@angular/router";
import { LayoutComponent } from './layout/layout.component';
import {FormModule} from "@shared/modules/form.module";
import { ActionsComponent } from './pages/actions/actions.component';
import {IconModule} from "@shared/modules/icon.module";
import { ForgotComponent } from './pages/forgot/forgot.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forgot',
        component: ForgotComponent
      },
      {
        path: 'actions',
        component: ActionsComponent
      },
    ]
  }

];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LayoutComponent, ActionsComponent, ForgotComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IconModule,
    FormModule
  ]
})
export class AuthModule { }
