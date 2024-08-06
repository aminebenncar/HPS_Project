import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { HttpClient, HttpParams } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material/table";

interface Element {
  id: number;
  elementnumber: number | null;
  position: string | null;
  description_p: string | null;
  code: string | null;
  description_c: string | null;
  nomprotocole: string | null;
}


@Component({
  selector: 'app-filterpage',
  templateUrl: './filterpage.component.html',
  styleUrls: ['./filterpage.component.css']
})
export class FilterpageComponent implements OnInit {
  public dataSource = new MatTableDataSource<Element>();
  public displayedColumns: string[] = ['elementnumber', 'position', 'description_p', 'code', 'description_c'];
  public elementnumber: number | null = null;
  public code: string = '';
  public position: string = '';

  public elementNumbers: number[] = [3, 22, 24, 25, 39, 53, 54, 56, 60];
  public codes: string[] = ['1100', '1110', '1120', '1121', '1130', '1200', '1210', '1220', '1221', '1230', '1420', '1421', '1430', '1422', '1423', '1432', '1520', '1521', '1522', '1523', '1530', '1532', '1304', '1314', '1324', '1334', '1604', '1614', '1720', '1722', '1730', '1732', '1804', '1814'];
  public positions: string[] = [];

  private excludedElementsForCode: { [key: string]: number[] } = {
    'H_1100': [25, 56],
    'H_1110': [24, 25, 53, 56, 60],
    'H_1120': [56],
    'H_1121': [56],
    'H_1130': [22, 24, 25, 53, 56, 60],
    'H_1200': [56, 39, 54, 56],
    'H_1210': [24, 56, 53, 56, 60],
    'H_1220': [24, 60],
    'H_1221': [24, 60],
    'H_1230': [22, 24, 25, 55, 56],
    'H_1304': [22, 39, 25, 53, 54, 55, 56],
    'H_1314': [22, 24, 25, 39, 55, 56],
    'H_1324': [3, 22, 39, 53, 54, 55, 56],
    'H_1334': [3, 22, 24, 25, 39, 53, 54, 55, 56],
    'H_1420': [54, 55],
    'H_1421': [3, 54, 55],
    'H_1430': [3, 24, 25, 54, 55, 56, 60],
    'H_1422': [3, 22, 54, 55, 56],
    'H_1423': [3, 22, 54, 55, 56],
    'H_1432': [3, 22, 24, 39, 54, 55, 56],
    'H_1520': [3, 22, 39, 54, 55, 56],
    'H_1521': [3, 22, 39, 54, 55, 56],
    'H_1530': [3, 22, 24, 53, 54, 55, 56],
    'H_1522': [3, 22, 54, 55, 56, 39],
    'H_1523': [3, 22, 54, 55, 56, 39],
    'H_1532': [3, 22, 24, 53, 54, 55, 56],
    'H_1604': [3, 22, 24, 53, 54, 55, 56, 39],
    'H_1614': [3, 22, 24, 53, 54, 55, 56],
    'H_1720': [22, 24, 53, 54, 55, 56, 39],
    'H_1722': [22, 24, 53, 54, 55, 56, 39],
    'H_1730': [22, 24, 53, 54, 55, 56, 39],
    'H_1732': [22, 24, 53, 54, 55, 56],
    'H_1804': [3, 22, 53, 54, 55, 56, 39],
    'H_1814': [3, 22, 24, 53, 54, 55, 56],
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<Element[]>('http://localhost:8080/element-values').subscribe({
      next: data => {
        this.dataSource.data = this.formatData(this.applyExclusions(data));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.error('Error fetching element values:', err);
      }
    });
  }

  filterData() {
    let params = new HttpParams();
    if (this.elementnumber !== null) {
      params = params.set('elementnumber', this.elementnumber.toString());
    }
    if (this.code) {
      params = params.set('code', `H_${this.code}`);
    }
    if (this.position) {
      params = params.set('position', this.position);
    }

    if (!params.keys().length) {
      console.error('At least one filter must be provided');
      return;
    }

    this.http.get<Element[]>('http://localhost:8080/element-values', { params }).subscribe({
      next: data => {
        this.dataSource.data = this.formatData(this.applyExclusions(data));
        this.dataSource.paginator = this.paginator;
        this.updateDisplayedColumns(this.dataSource.data);
      },
      error: err => {
        console.error('Error fetching filtered element values:', err);
      }
    });
  }

  applyExclusions(data: Element[]): Element[] {
    const codeWithPrefix = `H_${this.code}`;
    if (this.excludedElementsForCode[codeWithPrefix]) {
      return data.filter(item => !this.excludedElementsForCode[codeWithPrefix].includes(<number>item.elementnumber));
    }
    return data;
  }

  updateDisplayedColumns(data: Element[]): void {
    const columns = ['position', 'description_p', 'code', 'description_c'];
    this.displayedColumns = columns.filter(column => data.some(element => element[column as keyof Element] !== null && element[column as keyof Element] !== ''));
  }

  onElementNumberChange() {
    if (this.elementnumber !== null) {
      this.http.get<string[]>('http://localhost:8080/positions', { params: new HttpParams().set('elementnumber', this.elementnumber.toString()) })
        .subscribe({
          next: positions => {
            this.positions = positions;
          },
          error: err => {
            console.error('Error fetching positions:', err);
            this.positions = [];
          }});
    } else {
      this.positions = [];
    }}
  onCodeChange() {
    if (this.code) {
      const codeWithPrefix = `H_${this.code}`;
      const excludedElements = this.excludedElementsForCode[codeWithPrefix] || [];
      this.elementNumbers = this.elementNumbers.filter(elementNumber => !excludedElements.includes(elementNumber));
    } else {
      this.elementNumbers = [3, 22, 24, 25, 39, 53, 54, 56, 60];
    }
  }

  refreshPage() {
    this.code = '';
    this.elementnumber = null;
    this.position = '';
    this.positions = [];
    this.fetchData();
  }


  formatData(data: Element[]): Element[] {
    let lastElementNumber: number | null = null;
    let lastPosition: string | null = null;
    let lastDescriptionP: string | null = null;

    return data.map(item => {
      const formattedItem = { ...item };
      if (formattedItem.elementnumber === lastElementNumber) {
        formattedItem.elementnumber = null;
      } else {
        lastElementNumber = formattedItem.elementnumber;
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

}
