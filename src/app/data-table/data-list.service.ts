import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataListService {
  uri = 'https://jsonplaceholder.typicode.com/albums/1/photos';

  constructor(private http: HttpClient) { }

  viewData() {
    return this.http.get(`${this.uri}`); // this method will send the HTTP Post request to the backend
  }
}
