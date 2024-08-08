import { Component, OnInit } from '@angular/core';
import {Select} from "@ngxs/store";
import {UserState} from "@core/logic/user/user.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Select(UserState.uid) uid$: Observable<any>;
  @Select(UserState.photoURL) photoURL$: Observable<any>;
  @Select(UserState.email) email$: Observable<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
