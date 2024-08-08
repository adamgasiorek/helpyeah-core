import { NgModule } from '@angular/core';
import {NgxsModule} from "@ngxs/store";
import {UserState} from "@core/logic/user/user.state";
import {AdminState} from "@core/logic/admin/admin.state";

@NgModule({
  imports: [
    NgxsModule.forFeature([AdminState])
  ]
})
export class AdminLogicModule {}
