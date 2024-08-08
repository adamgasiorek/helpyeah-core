import { TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {RouterTestingModule} from "@angular/router/testing";
import {NgxsModule} from "@ngxs/store";

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        RouterTestingModule,
        NgxsModule.forRoot()
      ]
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
