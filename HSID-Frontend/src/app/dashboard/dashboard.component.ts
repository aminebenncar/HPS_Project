import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CommonModule, NgForOf, NgIf } from "@angular/common";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTableDataSource,
  MatTable,
} from "@angular/material/table";
import { MatDivider } from "@angular/material/divider";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { AddProtocoleComponent } from "../add-protocole/add-protocole.component";
import { EditProtocoleComponent } from "../edit-protocole/edit-protocole.component";
import { AuthenticationService } from "../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatCard, MatCardContent, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatHeaderCellDef, MatCellDef, MatCardHeader, MatCardTitle, MatDivider, NgForOf, NgIf, MatFormField, MatHeaderRow, MatHeaderRowDef, MatInput, MatLabel, MatPaginator, MatRow, MatRowDef, MatSlideToggle, MatSort, MatSortHeader, MatIcon, MatIconButton, MatButton],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  customers: any;
  dataSource = new MatTableDataSource<any>();
  public displayedColumns = ["id", "firstName", "email", "actions"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  currentDate: Date | undefined;

  constructor(private http: HttpClient, public authService: AuthenticationService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.http.get<any[]>("http://localhost:8080/protocoles")
      .subscribe({
        next: data => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: err => {
          console.log(err);
        }
      });
    this.updateDate();
    setInterval(() => {
      this.updateDate();
    }, 1000);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterCustomers(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editElement(element: Element) {
    console.log('Edit:', element);
  }

  deleteElement(id: number) {
    this.http.delete(`http://localhost:8080/protocoles/${id}`)
      .subscribe({
        next: () => {
          this.refreshData();
          console.log(`Protocole with id ${id} deleted successfully.`);
          this.snackBar.open('Protocole deleted successfully!', 'Close', {
            duration: 3000
          });
        },
        error: err => {
          console.error('Error deleting protocole:', err);
          this.snackBar.open(`Failed to add Protocole`, 'Close', {
            duration: 3000
          });
        }
      });
  }

  onButtonClick(element: any) {
    this.router.navigateByUrl("/admin/hsid");
  }

  private updateDate() {
    this.currentDate = new Date();
  }

  goToDetails(nomprotocole: any) {
    const nomProtocoleMinuscule = nomprotocole.toLowerCase();
    this.router.navigate([`/admin/${nomProtocoleMinuscule}`]).then(r => true);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProtocoleComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.refreshData();
        this.snackBar.open('Protocole added successfully!', 'Close', {
          duration: 3000
        });
      }
      else{
        this.snackBar.open(`Failed to add the new Protocole`, 'Close', {
          duration: 3000
        });
      }
    });
  }

  openEditDialog(protocole: any): void {
    const dialogRef = this.dialog.open(EditProtocoleComponent, {
      width: '400px',
      data: { ...protocole }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.refreshData();
      }
    });
  }

  refreshData() {
    this.http.get<any[]>("http://localhost:8080/protocoles")
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
