import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {UserState} from "@core/logic/user/user.state";
import {Observable} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {MustMatch} from "@shared/helpers/must-match.validator";
import {
  LinkWithFacebook,
  LinkWithGoogle,
  LinkWithPassword,
  Unlink, UpdatePassword
} from "@core/logic/user/advanced/user-advanced.actions";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  @Select(UserState.googleProvider) googleProvider$: Observable<any>;
  @Select(UserState.facebookProvider) facebookProvider$: Observable<any>;
  @Select(UserState.passwordProvider) passwordProvider$: Observable<any>;
  @Select(UserState.isLastProvider) isLastProvider$: Observable<any>;

  linkForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  resetForm = this.formBuilder.group({
    email: ['', Validators.required],
  });

  passwordChangeForm = this.formBuilder.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
  });

  constructor(private store: Store, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  unlink(providerId) {
    this.store.dispatch(new Unlink({providerId}));
  }

  linkWithFacebook() {
    this.store.dispatch(new LinkWithFacebook());
  }

  linkWithGoogle() {
    this.store.dispatch(new LinkWithGoogle());
  }


  onSubmitLink() {
    this.store.dispatch(new LinkWithPassword({email: this.linkForm.value.email, password: this.linkForm.value.password}));
    this.linkForm.reset();
  }

  onSubmitPasswordChange() {
    this.store.dispatch(new UpdatePassword(this.passwordChangeForm.value));
    this.passwordChangeForm.reset();
  }

}
