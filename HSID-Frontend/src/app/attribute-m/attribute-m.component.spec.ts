import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeMComponent } from './attribute-m.component';

describe('AttributeMComponent', () => {
  let component: AttributeMComponent;
  let fixture: ComponentFixture<AttributeMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributeMComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributeMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
