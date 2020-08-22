import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectSignupComponent } from './signup.component';

describe('SubjectSignupComponent', () => {
  let component: SubjectSignupComponent;
  let fixture: ComponentFixture<SubjectSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
