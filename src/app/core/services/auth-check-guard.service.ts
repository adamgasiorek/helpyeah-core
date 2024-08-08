import { Injectable } from '@angular/core';
import {filter, switchMap, take, tap} from "rxjs/operators";
import {CheckUser} from "@core/logic/user/user.actions";
import {Actions, ofActionCompleted, Select, Store} from "@ngxs/store";
import {RemoveLoader} from "@core/logic/handler/handler.actions";
import {LoaderEnum} from "@shared/enums/loader.enum";
import {UserService} from "@core/logic/user/user.service";
import {Router} from "@angular/router";
import {UserState} from "@core/logic/user/user.state";
import {Observable} from "rxjs";
import {HandlerState} from "@core/logic/handler/handler.state";

@Injectable({
  providedIn: 'root'
})
export class AuthCheckGuardService {
  @Select(UserState.isAuthenticated) isAuthenticated$: Observable<any>;
  @Select(HandlerState.isAppInitialized) isAuthLoading$: Observable<any>;

  constructor(private store: Store, private userService: UserService, private router: Router, private actions: Actions) { }

  getAuthWhenReady() {
    return this.isAuthLoading$
        .pipe(tap((loaded) => {
          if(!loaded) {
            this.store.dispatch(new CheckUser());
            this.actions.pipe(ofActionCompleted(CheckUser), take(1)).subscribe(() => {
              this.store.dispatch(new RemoveLoader({type: LoaderEnum.INIT_APP}));
            });
          }
        }), filter(x => x), take(1), switchMap((res) => {
          return this.isAuthenticated$.pipe(take(1))
        }));
  }
}
