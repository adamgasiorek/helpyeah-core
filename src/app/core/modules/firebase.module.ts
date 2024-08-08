import { NgModule } from '@angular/core';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireFunctionsModule, ORIGIN} from "@angular/fire/functions";
import {AngularFireAnalyticsModule} from "@angular/fire/analytics";

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule
  ]
})
export class FirebaseModule { }
