import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-protocole',
  templateUrl: './edit-protocole.component.html',
  styleUrls: ['./edit-protocole.component.css']
})
export class EditProtocoleComponent {

  constructor(
    public dialogRef: MatDialogRef<EditProtocoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.http.put(`http://localhost:8080/${this.data.id}`, this.data)
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: err => {
          console.error('Error updating protocole:', err);
        }
      });
  }
}
