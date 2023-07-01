import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  async getCustomers() {
    //const res = await fetch(`${environment.apiURL}/api/customers`);
    return this.http.get(`${environment.apiURL}/api/customers`).toPromise()
    //return await res.json();
  }
}
