import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Router, CanLoad, CanActivate} from '@angular/router';
import {from, Observable, of} from 'rxjs';
import {AuthCheckGuardService} from "@core/services/auth-check-guard.service";
import {map, take, tap} from "rxjs/operators";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class NotLoggedGuard implements CanLoad {

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private authCheckGuardService: AuthCheckGuardService, private router: Router) {
    }

    canLoad(): Observable<boolean> {
            return this.authCheckGuardService.getAuthWhenReady()
                .pipe(take(1), map(isAuthenticated => !isAuthenticated),
                    tap((isNotAuthenticated: boolean) => {
                        if (!isNotAuthenticated) {
                            this.router.navigate(['']);
                        }
                    }))
    }
}
