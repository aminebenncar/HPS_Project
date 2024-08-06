import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProtocoleComponent } from './add-protocole.component';

describe('AddProtocoleComponent', () => {
  let component: AddProtocoleComponent;
  let fixture: ComponentFixture<AddProtocoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProtocoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProtocoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
