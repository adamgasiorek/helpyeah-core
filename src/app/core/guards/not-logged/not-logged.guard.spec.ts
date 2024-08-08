import { TestBed } from '@angular/core/testing';

import { NotLoggedGuard } from './not-logged.guard';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {RouterTestingModule} from "@angular/router/testing";
import {NgxsModule} from "@ngxs/store";

describe('NotLoggedGuard', () => {
  let guard: NotLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        RouterTestingModule,
        NgxsModule.forRoot()
      ]
    });
    guard = TestBed.inject(NotLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
