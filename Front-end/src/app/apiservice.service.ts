import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  apiUrl = "http://localhost:3000/users";
  url = "http://localhost:3000/user";

  constructor(private http: HttpClient) { }

  //Get all users 
  getalluser(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  //Create user 
  createuser(data: any): Observable<any> {
    // console.log(data);
    return this.http.post(`${this.url}`, data);
  }

  // delete data
  deleteData(id: any): Observable<any> {
    let ids = id;
    return this.http.delete(`${this.url}/${ids}`);

  }

  //Update data
  updatestud(data: any, id: any): Observable<any> {
    let ids = id;
    return this.http.put(`${this.url}/${ids}`, data)

  }
  //get single id

  getbyID(id: any): Observable<any> {
    let ids = id;
    return this.http.get(`${this.apiUrl}/${ids}`);
  }
}
