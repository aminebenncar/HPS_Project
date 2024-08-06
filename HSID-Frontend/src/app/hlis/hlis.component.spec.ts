import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HlisComponent } from './hlis.component';

describe('HlisComponent', () => {
  let component: HlisComponent;
  let fixture: ComponentFixture<HlisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HlisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HlisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
