import { Component, OnInit } from '@angular/core';
import {ResetPasswordWithMail} from "@core/logic/user/advanced/user-advanced.actions";
import {Select, Store} from "@ngxs/store";
import {FormBuilder, Validators} from "@angular/forms";
import {UserState} from "@core/logic/user/user.state";
import {Observable} from "rxjs";
import {HandlerState} from "@core/logic/handler/handler.state";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  @Select(HandlerState.error('auth/user-not-found')) error$: Observable<any>;

  resetForm = this.formBuilder.group({
    email: ['', Validators.required]
  });

  constructor(private store: Store, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmitReset() {
    this.store.dispatch(new ResetPasswordWithMail(this.resetForm.value));
    this.resetForm.reset();
  }

}
