import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {AdminState} from "@core/logic/admin/admin.state";
import {GetAllUsers} from "@core/logic/admin/admin.actions";
import {CheckUser} from "@core/logic/user/user.actions";

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  @Select(AdminState.users) users$: Observable<any>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    // this.store.dispatch(new CheckUser());
  }

  ngAfterViewInit(): void {
    this.store.dispatch(new GetAllUsers());

  }

}
