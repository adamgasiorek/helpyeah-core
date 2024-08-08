import {Component, OnInit} from '@angular/core';
import {CheckUser} from "@core/logic/user/user.actions";
import {Actions, ofActionCompleted, Store} from "@ngxs/store";
import {RemoveLoader} from "@core/logic/handler/handler.actions";
import {LoaderEnum} from "@shared/enums/loader.enum";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(private store: Store, private actions: Actions) {
  }


}
