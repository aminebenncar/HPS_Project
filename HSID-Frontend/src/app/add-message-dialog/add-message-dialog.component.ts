import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-message-dialog',
  templateUrl: './add-message-dialog.component.html',
  styleUrl: './add-message-dialog.component.css'
})
export class AddMessageDialogComponent {
  message: any = {
    nomprotocole: '',
    code: '',
    specification: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AddMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close(this.message);
  }
}

