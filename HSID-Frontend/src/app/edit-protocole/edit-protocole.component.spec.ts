import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProtocoleComponent } from './edit-protocole.component';

describe('EditProtocoleComponent', () => {
  let component: EditProtocoleComponent;
  let fixture: ComponentFixture<EditProtocoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProtocoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProtocoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
