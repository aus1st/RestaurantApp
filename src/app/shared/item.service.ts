import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment';
import { OrderItem } from '../models/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get(`${environment.apiURL}/api/items`).toPromise()
  }
}
