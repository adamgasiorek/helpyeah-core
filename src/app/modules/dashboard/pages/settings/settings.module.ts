import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { BasicsComponent } from './basics/basics.component';
import { AccountsComponent } from './accounts/accounts.component';
import {MainComponent} from "@modules/dashboard/pages/main/main.component";
import {SettingsComponent} from "@modules/dashboard/pages/settings/settings.component";
import {FormModule} from "@shared/modules/form.module";

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'basics',
        pathMatch: 'full'
      },
      {
        path: 'basics',
        component: BasicsComponent,
      },
      {
        path: 'accounts',
        component: AccountsComponent
      },
    ]
  }
];

@NgModule({
  declarations: [BasicsComponent, AccountsComponent],
  imports: [
    CommonModule,
    FormModule,
    RouterModule.forChild(routes),
  ]
})
export class SettingsModule { }
