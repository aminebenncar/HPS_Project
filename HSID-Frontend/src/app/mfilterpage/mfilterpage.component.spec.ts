import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfilterpageComponent } from './mfilterpage.component';

describe('MfilterpageComponent', () => {
  let component: MfilterpageComponent;
  let fixture: ComponentFixture<MfilterpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MfilterpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MfilterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
