import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,MatTableDataSource,
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
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthenticationService} from "../services/authentication.service";
import {PopUpDetailsComponent} from "../pop-up-details/pop-up-details.component";
import {UpdateRequirementDialogComponent} from "../update-requirement-dialog/update-requirement-dialog.component";

@Component({
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatCard, MatCardContent, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatHeaderCellDef, MatCellDef, MatCardHeader, MatCardTitle, MatDivider, NgForOf, NgIf, MatFormField, MatHeaderRow, MatHeaderRowDef, MatInput, MatLabel, MatPaginator, MatRow, MatRowDef, MatSlideToggle, MatSort, MatSortHeader, MatIcon, MatIconButton, MatButton],
  selector: 'app-attribute-m',
  templateUrl: './attribute-m.component.html',
  styleUrl: './attribute-m.component.css'
})

export class AttributeMComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  public displayedColumns = ["id", "firstName", "lastName", "email", "actions"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected attribute: string | null;
  targetElementNumbers = [3, 22, 24, 25, 39, 48, 53, 54, 55, 56, 60, 61, 62, 127];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, public authService: AuthenticationService) {
    this.attribute = null;
  }

  ngOnInit(): void {
    if (this.authService.roles.includes('ADMIN')) {
      this.displayedColumns.push('modify');
    }
    this.attribute = this.route.snapshot.queryParamMap.get('attribute');
    this.http.get(`http://localhost:8080/attribute?attribute=${this.attribute}`).subscribe(data => {
      this.dataSource.data = this.formatData(data as any[]);
      if (!this.authService.roles.includes('ADMIN')){
        this.dataSource.data = this.dataSource.data.filter(element => element.specificAttributeValue.trim() !== '');}
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.sort.sort({ id: 'elementNumber', start: 'asc', disableClear: true });
    this.dataSource.sortData = (data: any[], sort: MatSort) => {
      const active = sort.active;
      const direction = sort.direction;
      if (!active || direction === '') {
        return data;
      }
      return data.sort((a, b) => {
        let comparatorResult = 0;
        if (a[active] != null && b[active] != null) {
          comparatorResult = a[active] < b[active] ? -1 : a[active] > b[active] ? 1 : 0;
        }
        return comparatorResult * (direction === 'asc' ? 1 : -1);
      });
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCodeWithoutPrefix(attribute: any): String {
    return attribute.replace("M_", "");
  }

  goBack(): void {
    this.router.navigateByUrl("/admin/msid").then(r => true);
  }

  goToDetails(code: string) {
    this.router.navigate(['/admin/attribute-m'], { queryParams: { attribute: code } });
  }

  openDialog(element: any): void {
    const dialogRef = this.dialog.open(PopUpDetailsComponent, {
      width: '1000px',
      data: { elementnumber: element.elementNumber }
    });
    this.router.navigate(['admin/attribute-m'], { queryParams: { elementnumber: element.elementNumber } });
  }

  formatData(data: any[]): any[] {
    let lastElementNumber: number | null = null;
    let lastPosition: string | null = null;
    let lastDescriptionP: string | null = null;

    return data.map(item => {
      const formattedItem = { ...item };
      if (formattedItem.elementNumber === lastElementNumber) {
        formattedItem.elementNumber = null;
      } else {
        lastElementNumber = formattedItem.elementNumber;
      }
      if (formattedItem.position === lastPosition) {
        formattedItem.position = null;
      } else {
        lastPosition = formattedItem.position;
      }
      if (formattedItem.description_p === lastDescriptionP) {
        formattedItem.description_p = null;
      } else {
        lastDescriptionP = formattedItem.description_p;
      }
      return formattedItem;
    });
  }

  openUpdateDialog(element: any): void {
    const dialogRef = this.dialog.open(UpdateRequirementDialogComponent, {
      width: '300px',
      data: {
        elementNumber: element.elementNumber,
        attribute: this.attribute,
        specificAttributeValue: element.specificAttributeValue
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh the data or handle the successful update
        this.http.get(`http://localhost:8080/attribute?attribute=${this.attribute}`).subscribe(data => {
          this.dataSource.data = this.formatData(data as any[]);
        });
      }
    });
  }

  getRequirementLabel(requirement: string): string {
    if (requirement.startsWith('O')) {
      return 'Obligatoire';
    } else if (requirement.startsWith('C')) {
      return 'Conditionnelle';
    } else if (requirement.startsWith('R')) {
      return 'Retournée inchangée';
    } else if (requirement.startsWith('F')) {
      return 'Facultative'; }
    else {
      return requirement;
    }
  }

  filterRows(): void {
    this.dataSource.data = this.dataSource.data.filter(element => element.specificAttributeValue.trim() !== '');
  }
}
