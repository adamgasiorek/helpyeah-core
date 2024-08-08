import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { ClickOutsideModule } from 'ng-click-outside';


@NgModule({
  declarations: [MenuComponent],
  exports: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    ClickOutsideModule
  ]
})
export class MenuComponentModule { }
