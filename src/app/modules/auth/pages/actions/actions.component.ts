import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {Logout} from "@core/logic/user/user.actions";
import {ResetConfirm, VerifyEmail} from "@core/logic/user/advanced/user-advanced.actions";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  mode: string;

  resetForm = this.formBuilder.group({
    password: ['', Validators.required],
  });

  constructor(private store: Store, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.mode = this.route.snapshot.queryParams.mode;
    if(this.mode === 'verifyEmail') {
      this.verifyEmail();
    }
  }

  onSubmitReset() {
    this.store.dispatch(new ResetConfirm({code: this.route.snapshot.queryParams.oobCode, newPassword: this.resetForm.value.password}))
        .subscribe((res) => this.backToMainPage(res));
    this.resetForm.reset();
  }

  verifyEmail() {
    this.store.dispatch(new VerifyEmail(this.route.snapshot.queryParams.oobCode))
        .subscribe((res) => this.backToMainPage(res));
  }

  backToMainPage(res) {
    if(res.auth) {
      this.store.dispatch(new Logout());
      this.router.navigate(['/']);
    }
  }

}
