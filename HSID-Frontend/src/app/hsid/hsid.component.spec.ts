import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HsidComponent } from './hsid.component';

describe('HsidComponent', () => {
  let component: HsidComponent;
  let fixture: ComponentFixture<HsidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HsidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HsidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
