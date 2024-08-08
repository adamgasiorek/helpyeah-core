import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import {RouterModule, Routes} from "@angular/router";
import { LayoutComponent } from './layout/layout.component';
import {UserLogicModule} from "@core/logic/user/user-logic.module";
import {AdminLogicModule} from "@core/logic/admin/admin-logic.module";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
];

@NgModule({
  declarations: [MainComponent, LayoutComponent],
  imports: [
    CommonModule,
    UserLogicModule,
    AdminLogicModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
