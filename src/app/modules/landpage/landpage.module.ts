import { NgModule } from '@angular/core';
import {MainComponent} from "./pages/main/main.component";
import {RouterModule, Routes} from "@angular/router";
import { LayoutComponent } from './layout/layout.component';
import {UserLogicModule} from "@core/logic/user/user-logic.module";
import {IconModule} from "@shared/modules/icon.module";
import {CommonModule} from "@angular/common";
import {FormModule} from "@shared/modules/form.module";
import {AdminLogicModule} from "@core/logic/admin/admin-logic.module";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MainComponent
      }
    ]
  },
];

@NgModule({
  declarations: [MainComponent, LayoutComponent],
  imports: [
    RouterModule.forChild(routes),
    FormModule,
    CommonModule,
    IconModule
  ]
})
export class LandpageModule { }
