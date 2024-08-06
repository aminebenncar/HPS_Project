import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

interface ElementValue {
  id: number;
  elementnumber: number;
  position: string;
  description_p: string;
  code: string;
  description_c: string;
  in_message: string | null;
  service: string | null;
  servcice_code: string | null;
}

@Component({
  selector: 'app-pop-up-details',
  templateUrl: './pop-up-details.component.html',
  styleUrl: './pop-up-details.component.css'
})
export class PopUpDetailsComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<ElementValue>();
  displayedColumns: string[] = ['position', 'description_p', 'code', 'description_c'];
  elementnumber: number | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private route: ActivatedRoute, public dialogRef: MatDialogRef<PopUpDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.elementnumber = Number(params['elementnumber']);
      this.fetchElementValues();
    });
  }

  fetchElementValues(): void {
    if (this.elementnumber !== null) {
      this.http.get<ElementValue[]>(`http://localhost:8080/element-values?elementnumber=${this.elementnumber}`)
        .subscribe({
          next: data => {
            const uniqueData = this.getUniqueElements(data);
            this.dataSource.data = uniqueData;
          },
          error: err => {
            console.error('Error fetching element values:', err);
          }
        });
    }
  }

  getUniqueElements(data: ElementValue[]): ElementValue[] {
    const uniqueData: ElementValue[] = [];
    const seenElements: { [key: string]: boolean } = {};
    data.forEach(element => {
      const key = `${element.position}-${element.description_p}-${element.code}-${element.description_c}-${element.in_message}`;
      if (!seenElements[key]) {
        seenElements[key] = true;
        uniqueData.push(element);
      }
    });
    return uniqueData;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  goBack(): void {
    this.dialogRef.close();
  }

  shouldDisplay(index: number, column: keyof ElementValue): boolean {
    const currentElement = this.dataSource.data[index];
    if (index === 0) {
      return true;
    }
    const previousElement = this.dataSource.data[index - 1];
    return currentElement[column] !== previousElement[column];
  }
}
