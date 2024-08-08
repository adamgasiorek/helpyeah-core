import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserService} from "@core/logic/user/user.service";
import {filter, map, switchMap, take, tap} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/auth";
import {Actions, ofActionCompleted, Select, Store} from "@ngxs/store";
import {UserState} from "@core/logic/user/user.state";
import {CheckUser} from "@core/logic/user/user.actions";
import {HandlerState} from "@core/logic/handler/handler.state";
import {RemoveLoader} from "@core/logic/handler/handler.actions";
import {LoaderEnum} from "@shared/enums/loader.enum";
import {AuthCheckGuardService} from "@core/services/auth-check-guard.service";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanLoad {

    constructor(@Inject(PLATFORM_ID) private platformId: Object,private authCheckGuardService: AuthCheckGuardService, private router: Router) {
    }

    canLoad(): Observable<boolean> {
            return this.authCheckGuardService.getAuthWhenReady()
                .pipe(tap((isAuthenticated: boolean) => {
                    if (!isAuthenticated) {
                        this.router.navigate(['home']);
                    }
                }))
    }
}
