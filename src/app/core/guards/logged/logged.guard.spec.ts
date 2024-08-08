import { TestBed } from '@angular/core/testing';

import { LoggedGuard } from './logged.guard';
import {NgxsModule} from "@ngxs/store";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireFunctionsModule} from "@angular/fire/functions";
import {environment} from "../../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";



describe('LoggedGuard', () => {
  let guard: LoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        RouterTestingModule,
        NgxsModule.forRoot()
      ]
    });
    guard = TestBed.inject(LoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

