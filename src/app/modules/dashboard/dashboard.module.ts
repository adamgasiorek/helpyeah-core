import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { MainComponent } from './pages/main/main.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import {CommonModule} from "@angular/common";
import {FormModule} from "@shared/modules/form.module";
import {MenuComponentModule} from "@shared/components/menu/menu.module";
import {IconModule} from "@shared/modules/icon.module";
import {NgAisModule} from "angular-instantsearch";
import {SearchExtensionModule} from "@shared/components/search-extension/search-extension.module";
import { BuyComponent } from './pages/buy/buy.component';
import { NgxStripeModule } from 'ngx-stripe';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MainComponent,
      },
      { path: "buy", component: BuyComponent },
      { path: "search", component: MainComponent },
      { path: "search/:category", component: MainComponent },
      {
        path: 'profile/:id',
        component: ProfileComponent
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then((m) => m.SettingsModule),
      }
    ]
  }
];

@NgModule({
  declarations: [MainComponent, LayoutComponent, ProfileComponent, SettingsComponent, BuyComponent],
  imports: [
    CommonModule,
    FormModule,
    RouterModule.forChild(routes),

    // NgxStripeModule.forRoot('pk_test_51GreGsIEfhKK9GVG5IpwkvuOXnwyYqr6sDt0qfliTzAg29vUlJ9PDXCIuV7iCcIbt8SMhm9G2UkMPCSyQCnH6oX800x0X4HyMm'),

    NgAisModule,
    SearchExtensionModule,

    MenuComponentModule,
    IconModule
  ]
})
export class DashboardModule { }
