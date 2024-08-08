import { TestBed } from '@angular/core/testing';

import { AuthCheckGuardService } from './auth-check-guard.service';
import {RouterModule} from "@angular/router";
import {UserLogicModule} from "@core/logic/user/user-logic.module";
import {NgxsModule} from "@ngxs/store";
import {UserState} from "@core/logic/user/user.state";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";

describe('AuthCheckGuardService', () => {
  let service: AuthCheckGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        NgxsModule.forRoot()
      ],
    });
    service = TestBed.inject(AuthCheckGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
