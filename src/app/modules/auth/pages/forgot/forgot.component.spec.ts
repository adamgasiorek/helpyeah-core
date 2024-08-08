import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotComponent } from './forgot.component';
import {FormModule} from "@shared/modules/form.module";
import {RouterTestingModule} from "@angular/router/testing";
import {NgxsModule} from "@ngxs/store";
import {IconModule} from "@shared/modules/icon.module";

describe('ForgotComponent', () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormModule, RouterTestingModule, NgxsModule.forRoot() ],
      declarations: [ ForgotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
