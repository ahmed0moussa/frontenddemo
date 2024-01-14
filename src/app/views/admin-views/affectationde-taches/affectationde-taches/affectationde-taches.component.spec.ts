import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationdeTachesComponent } from './affectationde-taches.component';

describe('AffectationdeTachesComponent', () => {
  let component: AffectationdeTachesComponent;
  let fixture: ComponentFixture<AffectationdeTachesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffectationdeTachesComponent]
    });
    fixture = TestBed.createComponent(AffectationdeTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
