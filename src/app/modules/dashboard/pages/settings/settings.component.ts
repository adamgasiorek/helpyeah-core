import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MustMatch} from "@shared/helpers/must-match.validator";
import {
  Login,
  Logout,
} from "@core/logic/user/user.actions";
import {Actions, ofActionCompleted, Select, Store} from "@ngxs/store";
import {UserState} from "@core/logic/user/user.state";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {
  LinkWithFacebook,
  LinkWithGoogle,
  LinkWithPassword,
  Unlink, UpdatePassword
} from "@core/logic/user/advanced/user-advanced.actions";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
