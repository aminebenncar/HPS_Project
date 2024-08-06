import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MlisComponent } from './mlis.component';

describe('MlisComponent', () => {
  let component: MlisComponent;
  let fixture: ComponentFixture<MlisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MlisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MlisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
