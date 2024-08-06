import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-protocole',
  templateUrl: './add-protocole.component.html',
  styleUrls: ['./add-protocole.component.css']
})
export class AddProtocoleComponent {
  newProtocole = { nomprotocole: '', description: '', version: '' };

  constructor(
    public dialogRef: MatDialogRef<AddProtocoleComponent>,
    private http: HttpClient
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.newProtocole.nomprotocole && this.newProtocole.description && this.newProtocole.version) {
      this.http.post("http://localhost:8080/protocoles", this.newProtocole)
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: err => {
            console.log(err);
          }
        });
    } else {
      console.log("Please fill in all fields");
    }
  }
}
