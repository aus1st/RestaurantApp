import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/order-item.model';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order = {
    CustomerId: 0,
    GTotal: 0,
    OrderId: 0,
    OrderNo: '',
    PMethod: '',
    //CustomerName: ''
    DeletedEntries: ''
  };
  orderItems: OrderItem[] = [];
  constructor(private http: HttpClient) { }

  async saveOrder() {
    const order = {
      ...this.formData,
      OrderItems: this.orderItems
    }

    const res = await fetch(`${environment.apiURL}/api/Orders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(order)
    })

    return await res.json();
    //return this.http.post(`${environment.apiURL}/api/Orders`, order)

  }

  async getOrders() {
    const res = await fetch(`${environment.apiURL}/api/Orders`);
    return await res.json();
  }

  async getOrderById(id: number) {
    const res = await fetch(`${environment.apiURL}/api/Orders/${id}`);
    return await res.json();
  }

  async deleteOrder(id: number) {
    const res = await fetch(`${environment.apiURL}/api/Orders/${id}`,{
      method: 'DELETE'
    });
    return await res.json();
  }



  updateGrandTotal() {
    this.formData.GTotal = this.orderItems.reduce((prev: number, curr: OrderItem) => {
      return prev + curr.Total;
    }, 0);

    this.formData.GTotal = parseFloat((this.formData.GTotal.toFixed(2)));
  }
}
