import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTableDataSource,
  MatTable,
} from "@angular/material/table";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EditMessageDialogComponent} from "../edit-message-dialog/edit-message-dialog.component";
import {AuthenticationService} from "../services/authentication.service";
import {AddMessageDialogComponent} from "../add-message-dialog/add-message-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatCard, MatCardContent, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatHeaderCellDef, MatCellDef, MatCardHeader, MatCardTitle, MatDivider, NgForOf, NgIf, MatFormField, MatHeaderRow, MatHeaderRowDef, MatInput, MatLabel, MatPaginator, MatRow, MatRowDef, MatSlideToggle, MatSort, MatSortHeader, MatIcon, MatIconButton, MatButton, RouterLink],
  selector: 'app-hsid',
  templateUrl: './hsid.component.html',
  styleUrls: ['./hsid.component.css'],
})
export class HsidComponent implements OnInit, AfterViewInit {
  customers: any;
  dataSource = new MatTableDataSource<any>();
  public displayedColumns = ["firstName", "lastName", "email", "action"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    public authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.authService.roles.includes('ADMIN')) {
      this.displayedColumns.push('action2');
    }
    this.http.get<any[]>("http://localhost:8080/messages/protocole/HSID")
      .subscribe({
        next: data => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.sortData(); // Initialize sorting data accessor
          this.sort.sort({ id: 'lastName', start: 'asc', disableClear: true }); // Sort by 'lastName' column (code) in ascending order by default
        },
        error: err => {
          console.log(err);
        }
      });
  }

  getCodeWithoutPrefix(code: string): string {
    return code.replace("H_", "");
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterCustomers(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  goToDetails(code: string) {
    this.router.navigate(['/admin/attribute'], {queryParams: {attribute: code}});
  }

  goBack(): void {
    this.router.navigateByUrl("/admin/dashboard").then(r => true);
  }

  openEditDialog(element: any): void {
    const dialogRef = this.dialog.open(EditMessageDialogComponent, {
      width: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the dataSource with the modified data
        const index = this.dataSource.data.findIndex(item => item.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data]; // Refresh the dataSource
          this.cdr.detectChanges(); // Trigger change detection
        }
      }
    });
  }

  sortData() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'lastName':
          return this.getCodeWithoutPrefix(item.code);
        default:
          return item[property];
      }
    };
  }

  addMessage(): void {
    const dialogRef = this.dialog.open(AddMessageDialogComponent,
      {
      width: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post<any>('http://localhost:8080/messages', result)
          .subscribe({
            next: data => {
              this.dataSource.data.push(data);
              this.refreshData();
              this.snackBar.open('Message added successfully!', 'Close', {
                duration: 3000
              });
            },
            error: err => {
              console.error('Error adding message: ', err);
              this.refreshData();
            }
          });
      }
    });
  }

  deleteMessage(id: number): void {
    this.http.delete(`http://localhost:8080/messages/${id}`, { responseType: 'text' })
      .subscribe({
        next: () => {
          // Remove the deleted message from the dataSource
          this.dataSource.data = this.dataSource.data.filter(message => message.id !== id);
          this.dataSource.data = [...this.dataSource.data]; // Refresh the dataSource to update the view
          this.cdr.detectChanges();
          this.snackBar.open('Message deleted successfully!', 'Close', {
            duration: 3000
          });
        },
        error: err => {
          console.error('Error deleting message: ', err);
          this.snackBar.open('Failed to delete message', 'Close', {
            duration: 3000
          });
        }
      });
  }

  refreshData() {
    this.http.get<any[]>("http://localhost:8080/messages/protocole/HSID")
      .subscribe({
        next: data => {
          this.dataSource.data = data;
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
