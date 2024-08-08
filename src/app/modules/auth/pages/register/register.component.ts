import { Component, OnInit } from '@angular/core';
import {FacebookLogin, GoogleLogin, Login, Register} from "@core/logic/user/user.actions";
import {FormBuilder, Validators} from "@angular/forms";
import {MustMatch} from "@shared/helpers/must-match.validator";
import {Actions, ofActionCompleted, Store} from "@ngxs/store";
import {take} from "rxjs/operators";
import {AddLoader, RemoveLoader} from "@core/logic/handler/handler.actions";
import {LoaderEnum} from "@shared/enums/loader.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  constructor(private store: Store, private formBuilder: FormBuilder,
              private actions: Actions, private router: Router) { }

  ngOnInit(): void {
    this.actions.pipe(ofActionCompleted(Register), take(1)).subscribe(() => {
      this.router.navigate(['']);
      this.store.dispatch(new RemoveLoader({type: LoaderEnum.AUTH_LOADER}));
    });
  }

  onSubmitRegister() {
    this.store.dispatch([
      new Register(this.registerForm.value),
      new AddLoader({type: LoaderEnum.AUTH_LOADER, value: true})
    ]);
    this.registerForm.reset();
  }

  facebookLogin() {
    this.store.dispatch(new FacebookLogin());
  }

  googleLogin() {
    this.store.dispatch(new GoogleLogin());
  }


}
