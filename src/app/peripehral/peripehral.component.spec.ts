import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripehralComponent } from './peripehral.component';

describe('PeripehralComponent', () => {
  let component: PeripehralComponent;
  let fixture: ComponentFixture<PeripehralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeripehralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeripehralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
