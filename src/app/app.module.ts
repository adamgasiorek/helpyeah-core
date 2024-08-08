import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {CoreModule} from "@core/core.module";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsModule} from "@ngxs/store";
import {UserLogicModule} from "@core/logic/user/user-logic.module";
import {HandlerLogicModule} from "@core/logic/handler/handler-logic.module";
import {CustomErrorHandler} from "@shared/helpers/error-handler";
import {NgAisModule} from "angular-instantsearch";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CoreModule,

    UserLogicModule,
    HandlerLogicModule,

    // NgAisModule.forRoot(),

    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
      selectorOptions: {
        injectContainerState: false
      }
    }),
    NgxsLoggerPluginModule.forRoot({disabled: true}),
    NgxsReduxDevtoolsPluginModule.forRoot({name: 'Helpyeah'}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
