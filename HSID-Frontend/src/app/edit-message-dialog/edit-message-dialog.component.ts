import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-edit-message-dialog',
  templateUrl: './edit-message-dialog.component.html',
  styleUrls: ['./edit-message-dialog.component.css']
})
export class EditMessageDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      nomprotocole: [data.nomprotocole],
      code: [data.code],
      specification: [data.specification]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const updatedData = this.editForm.value;
    let params = new HttpParams()
      .set('nomprotocole', updatedData.nomprotocole)
      .set('code', updatedData.code)
      .set('specification', updatedData.specification);

    this.http.put(`http://localhost:8080/messages/${this.data.id}`, {}, { params: params })
      .subscribe(response => {
        this.dialogRef.close(response);
      });
  }
}
