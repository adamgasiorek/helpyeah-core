import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {FormModule} from "@shared/modules/form.module";
import {RouterTestingModule} from "@angular/router/testing";
import {NgxsModule} from "@ngxs/store";
import {IconModule} from "@shared/modules/icon.module";

describe('AuthRegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormModule, RouterTestingModule, NgxsModule.forRoot(), IconModule],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
