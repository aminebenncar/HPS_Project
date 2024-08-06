import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMessageDialogComponent } from './add-message-dialog.component';

describe('AddMessageDialogComponent', () => {
  let component: AddMessageDialogComponent;
  let fixture: ComponentFixture<AddMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMessageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
