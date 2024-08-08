import { Injectable } from '@angular/core';
import { Router, CanLoad} from '@angular/router';
import {Observable, of} from 'rxjs';
import {filter, map, skipWhile, switchMap, take, tap} from "rxjs/operators";
import {Select, Store} from "@ngxs/store";
import {UserState} from "@core/logic/user/user.state";
import {AuthCheckGuardService} from "@core/services/auth-check-guard.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  @Select(UserState.permissions) permissions$: Observable<any>;

  constructor(private authCheckGuardService: AuthCheckGuardService, private router: Router) {
  }

  canLoad(): Observable<boolean> {
      return of(true)
    // return this.authCheckGuardService.getAuthWhenReady()
    //     .pipe(tap((isAuthenticated: boolean) => {
    //           if (!isAuthenticated) {
    //             this.router.navigate(['']);
    //           }
    //         }),
    //         switchMap((res) => {
    //           return this.permissions$.pipe(
    //               map(user => user.admin),
    //               tap(isPermitted => {
    //                 if (!isPermitted) {
    //                   this.router.navigate(['']);
    //                 }
    //               })
    //           )
    //         }))
  }
  
}
