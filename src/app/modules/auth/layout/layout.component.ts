import { Component, OnInit } from '@angular/core';
import {CheckUser} from "@core/logic/user/user.actions";
import {Actions, ofActionCompleted, Store} from "@ngxs/store";
import {take, timeout} from "rxjs/operators";
import {RemoveLoader} from "@core/logic/handler/handler.actions";
import {LoaderEnum} from "@shared/enums/loader.enum";
import {UserService} from "@core/logic/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private store: Store, private router: Router, private actions: Actions) { }

  ngOnInit(): void {
    // `this.store.dispatch(new CheckUser()).`pipe(take(1)).subscribe((res) => {
    //   if(!!res.auth.uid) {
    //     this.router.navigate(['']);
    //   }
    // });
  }

}
