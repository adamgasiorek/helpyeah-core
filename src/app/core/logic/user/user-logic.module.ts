import { NgModule } from '@angular/core';
import {NgxsModule} from "@ngxs/store";
import {UserAdvancedState} from "@core/logic/user/advanced/user-advanced.state";
import {UserState} from "@core/logic/user/user.state";

@NgModule({
  imports: [
    NgxsModule.forFeature([UserState])
  ]
})
export class UserLogicModule {}
