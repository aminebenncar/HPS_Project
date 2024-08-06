import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  protocols = ['HSID', 'MSID'];
  services = ['Purchase', 'Withdrawal', 'Refund', 'Casino purchase', 'Fees', 'Transferts'];
  codes = ['1100', '1200'];

  selectedProtocol = '';
  selectedService = '';
  selectedCode = '';

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['elementnumber', 'position', 'description_p', 'code'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initial data load if needed
  }

  filterData() {
    const url = `http://localhost:8080/search?nomprotocole=${this.selectedProtocol}&service=${this.selectedService}&servcicecode=${this.selectedCode}`;
    this.http.get<any[]>(url).subscribe(data => {
      this.dataSource.data = this.formatData(data);
    });
  }

  refreshPage() {
    this.filterData(); // or any other logic to refresh the data
  }

  formatData(data: any[]): any[] {
    const groupedData = data.reduce((acc, item) => {
      if (!acc[item.elementnumber]) {
        acc[item.elementnumber] = {
          elementnumber: item.elementnumber,
          position: item.position,
          description_p: item.description_p,
          codes: []
        };
      }
      acc[item.elementnumber].codes.push({
        code: item.code,
        description: item.description_c
      });
      return acc;
    }, {});

    return Object.values(groupedData);
  }
}
