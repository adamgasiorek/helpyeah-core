import { NgModule } from '@angular/core';
import {NgxsModule} from "@ngxs/store";
import {HandlerState} from "@core/logic/handler/handler.state";

@NgModule({
  imports: [
    NgxsModule.forFeature([HandlerState])
  ]
})
export class HandlerLogicModule {}
