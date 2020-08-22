import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSubjectComponent } from './register.component';

describe('RegisterSubjectComponent', () => {
  let component: RegisterSubjectComponent;
  let fixture: ComponentFixture<RegisterSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
