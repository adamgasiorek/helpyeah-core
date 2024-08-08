import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingIndicator} from "./loading/loading.component";



@NgModule({
  declarations: [LoadingIndicator],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingIndicator
  ]
})
export class SearchExtensionModule { }
