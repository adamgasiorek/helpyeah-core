import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {
    CheckUser,
    FacebookLogin, GetRedirectResult,
    GoogleLogin,
    Login,
    Logout,
    Register,
} from "@core/logic/user/user.actions";
import {UserService} from "@core/logic/user/user.service";
import {UserModel} from "@shared/models/user.model";
import {environment} from "../../../../environments/environment";
import {map, mapTo, switchMap, take, tap} from "rxjs/operators";
import {forkJoin, from, of} from "rxjs";
import {UserAdvancedService} from "@core/logic/user/advanced/user-advanced.service";
import {UserAdvancedState} from "@core/logic/user/advanced/user-advanced.state";

@State<UserModel>({
    name: 'auth',
    defaults: {
        uid: null,
        email: null,
        photoURL: null,
        providerData: [],
        token: null,
        permissions: {
            admin: false,
            superadmin: false
        }
    }
})
@Injectable()
export class UserState extends UserAdvancedState {

    @Selector()
    static permissions(state: UserModel) {
        return state.permissions;
    }

    @Selector()
    static token(state: UserModel) {
        return state.token;
    }

    @Selector()
    static isLastProvider(state: UserModel) {
        return state.providerData.length === 1;
    }

    @Selector()
    static googleProvider(state: UserModel) {
        return state.providerData.find((item) => item.providerId === 'google.com');
    }

    @Selector()
    static passwordProvider(state: UserModel) {
        return state.providerData.find((item) => item.providerId === 'password');
    }

    @Selector()
    static facebookProvider(state: UserModel) {
        return state.providerData.find((item) => item.providerId === 'facebook.com');
    }

    @Selector()
    static photoURL(state: UserModel): string | null {
        return state.photoURL;
    }

    @Selector()
    static email(state: UserModel): string | null {
        return state.email;
    }

    @Selector()
    static uid(state: UserModel): string | null {
        return state.uid;
    }

    @Selector()
    static isAuthenticated(state: UserModel): boolean {
        return !!state.uid;
    }

    constructor(protected userService: UserService, protected userAdvancedService: UserAdvancedService) {
        super(userAdvancedService);
    }

    @Action(Login)
    login(ctx: StateContext<UserModel>, action: Login) {
        const source$ = this.userService.doLogin(action.payload);
        return forkJoin([
            from(source$).pipe(map(res => res.user)),
            from(source$).pipe(switchMap(res => from(res.user.getIdTokenResult(true))
                .pipe(map(admin => admin.claims))))
        ])
        .pipe(map(([user, admin]) => super.createUser(user, admin)))
        .pipe(take(1), tap((res: UserModel) => ctx.setState(res)))
    }

    @Action(Register)
    register(ctx: StateContext<UserModel>, action: Register) {
        const source$ = this.userService.doRegister(action.payload);
        const sourceAdmin$ = this.userAdvancedService.doAddAdmin({email: action.payload.email});
        return forkJoin([
            from(source$).pipe(map(res => res.user)),
            action.payload.email === environment.adminEmail ?
                from(sourceAdmin$).pipe(mapTo({admin: true})) : of(null)
        ])
        .pipe(map(([user, admin]) => super.createUser(user, admin)))
        .pipe(take(1), tap((res: UserModel) => {
            ctx.setState(res)
            this.userAdvancedService.doSendEmailVerification();
        }))
    }

    @Action(CheckUser)
    checkUser(ctx: StateContext<UserModel>, action: CheckUser) {
        const source$ = this.userService.getCurrentUser();
        return forkJoin([
            from(source$),
            from(source$).pipe(switchMap(res => from(res.getIdTokenResult(true))
                .pipe(map(admin => admin.claims))))
        ])
        .pipe(map(([user, admin]) => super.createUser(user, admin)))
        .pipe(take(1), tap((res: UserModel) => ctx.setState(res)))
    }

    @Action(GoogleLogin)
    googleLogin(ctx: StateContext<UserModel>, action: GoogleLogin) {
        return this.userService.doGoogleLogin();
    }

    @Action(FacebookLogin)
    facebookLogin(ctx: StateContext<UserModel>, action: FacebookLogin) {
        return this.userService.doFacebookLogin();
    }

    @Action(GetRedirectResult)
    getRedirectResult(ctx: StateContext<UserModel>, action: GetRedirectResult) {
        const source$ = this.userService.getRedirectResult();
        return forkJoin([
            from(source$).pipe(map(res => res.user)),
            from(source$).pipe(switchMap(res => res.user === null ? of(null) : from(res.user.getIdTokenResult(true))
                .pipe(map(admin => admin.claims))))
        ])
            .pipe(map(([user, admin]) => this.createUser(user, admin)))
            .pipe(take(1), tap((res: UserModel) => ctx.setState(res)))
    }

    @Action(Logout)
    logout(ctx: StateContext<UserModel>) {
        const source$ = this.userService.doLogout();
        return from(source$)
            .pipe(map(() => super.createUser(null, null)))
            .pipe(take(1), tap((res: UserModel) => ctx.setState(res)))
    }
}
