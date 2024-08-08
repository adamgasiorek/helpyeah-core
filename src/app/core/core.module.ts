import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FirebaseModule} from "@core/modules/firebase.module";
import {UserLogicModule} from "@core/logic/user/user-logic.module";
import {HandlerLogicModule} from "@core/logic/handler/handler-logic.module";
import {NgxsModule} from "@ngxs/store";
import {environment} from "../../environments/environment";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {UserState} from "@core/logic/user/user.state";
import {HandlerState} from "@core/logic/handler/handler.state";
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';

@NgModule({
  imports: [
    NgxsModule.forRoot([UserState, HandlerState], {
      developmentMode: !environment.production,
      selectorOptions: {
        injectContainerState: false
      }
    }),
    NgxsLoggerPluginModule.forRoot({disabled: true}),
    NgxsReduxDevtoolsPluginModule.forRoot({name: 'Helpyeah', disabled: environment.production}),
    NgxsDispatchPluginModule.forRoot(),
    HttpClientModule,
    FirebaseModule,
    // UserLogicModule,
    // HandlerLogicModule,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded.`);
    }
  }
}
