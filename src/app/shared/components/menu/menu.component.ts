import { Component, OnInit } from '@angular/core';
import {Select} from "@ngxs/store";
import {UserState} from "@core/logic/user/user.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  modalVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClickedOutside(e: Event) {
    this.modalVisible = false;
  }

}
