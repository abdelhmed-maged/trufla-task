import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Data } from '../data'; // interface for type checking and cleaner code
import { DataListService } from './data-list.service'; // importing the service

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'image']; //  define the row templates
  fetchedData: Data[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; // decorator that configures a view query for the pagination
  @ViewChild(MatSort, {static: true}) sort: MatSort; // decorator that configures a view query for the sort
  datasource: MatTableDataSource<Data>; // data source that accepts a client-side data array
  pageSize = 10; // default page size
  loading ;
  constructor(private ds: DataListService) { // instantiate the object inside the constructor and
                                             // use that to call the function of the data-list.service file
  }

  ngOnInit() {
    this.loading = true; // Show the loading icon
    // get the data from the api using the service that contains the method that call the backend
    this.ds.viewData().subscribe((res: Data[]) => {
      this.fetchedData = res;
      this.datasource = new MatTableDataSource(this.fetchedData); // assign the value of the response to data source
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.loading = false;
    }, (error) => {
      console.log(error);
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.datasource.filter = filterValue; // Assign the filtered value to the datasource
  }
  onResize(event) {
    if (event.target.innerWidth > 600 && event.target.innerWidth < 800) {
      this.pageSize = 10; // Adjust page size to 10 for tablet display
    }
    else if (event.target.innerWidth > 800 && event.target.innerWidth < 1000) {
      this.pageSize = 15; // Adjust page size to 15 for desktop display
    } else {
      this.pageSize = 5; // Adjust page size to 5 for mobile display
    }
  }
}
