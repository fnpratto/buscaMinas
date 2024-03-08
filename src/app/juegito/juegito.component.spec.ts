import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegitoComponent } from './juegito.component';

describe('JuegitoComponent', () => {
  let component: JuegitoComponent;
  let fixture: ComponentFixture<JuegitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegitoComponent]
    });
    fixture = TestBed.createComponent(JuegitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
