import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CheckUser, Logout} from "@core/logic/user/user.actions";
import {Actions, ofActionCompleted, Select, Store} from "@ngxs/store";
import {take} from "rxjs/operators";
import {Router} from "@angular/router";
import {UserState} from "@core/logic/user/user.state";
import {Observable} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Select(UserState.photoURL) photoURL$: Observable<any>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private store: Store, private actions: Actions, private router: Router) { }

  ngOnInit(): void {
    // if(isPlatformBrowser(this.platformId)) {
    //   this.store.dispatch(new CheckUser());
    // }

    this.actions.pipe(ofActionCompleted(Logout), take(1)).subscribe(() => {
      this.router.navigate(['home']);
    });
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
