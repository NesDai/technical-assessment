import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://api.sampleapis.com/futurama/characters/?';

  constructor(private http: HttpClient) {}

  getEmployees(queries: any): Observable<any[]> {
    console.log("API call",this.apiUrl+queries);
    return this.http.get<any[]>(this.apiUrl+queries);
  }

  getEmployeeById(id: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `id=${id}`);
  }
}