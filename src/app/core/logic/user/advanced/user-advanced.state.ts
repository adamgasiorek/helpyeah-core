import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {UserModel} from "@shared/models/user.model";
import {forkJoin, from} from "rxjs";
import {map, switchMap, take, tap} from "rxjs/operators";
import {UserAdvancedService} from "@core/logic/user/advanced/user-advanced.service";
import {
    LinkWithFacebook,
    LinkWithGoogle,
    LinkWithPassword, ResetConfirm, ResetPasswordWithMail,
    Unlink, UpdatePassword, VerifyEmail
} from "@core/logic/user/advanced/user-advanced.actions";

@State<UserModel>({
    name: 'advanced'
})
@Injectable()
export class UserAdvancedState {

    constructor(protected userAdvancedService: UserAdvancedService) {
    }

    protected createUser(user, claims): UserModel {
        return {
            uid: user === null ? null : user.uid,
            email: user === null ? null : user.email,
            photoURL: user === null ? null : user.photoURL,
            providerData: user === null ? [] : user.providerData,
            token: user === null ? null : user.refreshToken,
            permissions: {
                admin: claims === null ? false : claims.admin,
                superadmin: claims === null ? false : claims.superadmin
            }
        }
    }

    @Action(UpdatePassword)
    updatePassword(ctx: StateContext<UserModel>, action: UpdatePassword) {
        const source$ = this.userAdvancedService.doUpdatePassword(action.payload);
        return from(source$).pipe()
    }

    @Action(Unlink)
    unlink(ctx: StateContext<UserModel>, action: Unlink) {
        const source$ = this.userAdvancedService.doUnlink(action.payload);
        return forkJoin([
            from(source$),
            from(source$).pipe(switchMap(res => from(res.getIdTokenResult(true))
                .pipe(map(admin => admin.claims))))
        ])
            .pipe(map(([user, admin]) => this.createUser(user, admin)))
            .pipe(take(1), tap((res: UserModel) => ctx.setState(res)))
    }

    @Action(ResetPasswordWithMail)
    resetWithMail(ctx: StateContext<UserModel>, action: ResetPasswordWithMail) {
        return from(this.userAdvancedService.doResetPasswordWithMail(action.payload))
    }

    @Action(VerifyEmail)
    verifyEmail(ctx: StateContext<UserModel>, action: VerifyEmail) {
        return this.userAdvancedService.doVerifyEmail(action.payload)
    }

    @Action(ResetConfirm)
    confirmReset(ctx: StateContext<UserModel>, action: ResetConfirm) {
        return this.userAdvancedService.doConfirmResetPassword(action.payload)
    }

    @Action(LinkWithPassword)
    linkWithPassword(ctx: StateContext<UserModel>, action: LinkWithPassword) {
        const source$ = this.userAdvancedService.doPasswordLink(action.payload);
        return forkJoin([
            from(source$).pipe(map(res => res.user)),
            from(source$).pipe(switchMap(res => from(res.user.getIdTokenResult(true))
                .pipe(map(admin => admin.claims))))
        ])
            .pipe(map(([user, admin]) => this.createUser(user, admin)))
            .pipe(take(1), tap((res: UserModel) => ctx.setState(res)))
    }

    @Action(LinkWithFacebook)
    linkWithFacebook(ctx: StateContext<UserModel>, action: LinkWithFacebook) {
        const source$ = this.userAdvancedService.doFacebookLink();
        return forkJoin([
            from(source$).pipe(map(res => res.user)),
            from(source$).pipe(switchMap(res => from(res.user.getIdTokenResult(true))
                .pipe(map(admin => admin.claims))))
        ])
            .pipe(map(([user, admin]) => this.createUser(user, admin)))
            .pipe(take(1), tap((res: UserModel) => ctx.setState(res)))
    }

    @Action(LinkWithGoogle)
    linkWithGoogle(ctx: StateContext<UserModel>, action: LinkWithGoogle) {
        const source$ = this.userAdvancedService.doGoogleLink();
        return forkJoin([
            from(source$).pipe(map(res => res.user)),
            from(source$).pipe(switchMap(res => from(res.user.getIdTokenResult(true))
                .pipe(map(admin => admin.claims))))
        ])
            .pipe(map(([user, admin]) => this.createUser(user, admin)))
            .pipe(take(1), tap((res: UserModel) => ctx.setState(res)))
    }
}


