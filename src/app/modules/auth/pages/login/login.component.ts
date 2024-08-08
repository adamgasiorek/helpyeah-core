import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FacebookLogin, GetRedirectResult, GoogleLogin, Login} from "@core/logic/user/user.actions";
import {Actions, ofActionCompleted, Select, Store} from "@ngxs/store";
import {take} from "rxjs/operators";
import {AddLoader, RemoveLoader} from "@core/logic/handler/handler.actions";
import {LoaderEnum} from "@shared/enums/loader.enum";
import {Router} from "@angular/router";
import {UserState} from "@core/logic/user/user.state";
import {Observable} from "rxjs";
import {HandlerState} from "@core/logic/handler/handler.state";
import {ResetPasswordWithMail} from "@core/logic/user/advanced/user-advanced.actions";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Select(HandlerState.isAuthLoading) isAuthLoading$: Observable<any>;
  @Select(HandlerState.isAppInitialized) isAppLoading$: Observable<any>;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private store: Store, private formBuilder: FormBuilder,
              @Inject(PLATFORM_ID) private platformId: Object,
              private actions: Actions, private router: Router) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new GetRedirectResult()).pipe(take(1)).subscribe((res) => {
        this.store.dispatch(new RemoveLoader({type: LoaderEnum.INIT_APP}));
        if(!!res.auth.uid) {
          this.router.navigate(['']);
        }
      });
    }
    this.actions.pipe(ofActionCompleted(Login), take(1)).subscribe(() => {
      this.router.navigate(['']);
      this.store.dispatch(new RemoveLoader({type: LoaderEnum.AUTH_LOADER}));
    });

  }

  onSubmitLogin() {
    this.store.dispatch([
        new Login(this.loginForm.value),
        new AddLoader({type: LoaderEnum.AUTH_LOADER, value: true})
    ]);
    this.loginForm.reset();
  }

  facebookLogin() {
    this.store.dispatch([
      new FacebookLogin(),
      new AddLoader({type: LoaderEnum.AUTH_LOADER, value: true})
    ]);
  }

  googleLogin() {
    this.store.dispatch([
      new GoogleLogin(),
      new AddLoader({type: LoaderEnum.AUTH_LOADER, value: true})
    ]);
  }


}
