import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order = {
    CustomerId: 0,
    GTotal: 0,
    OrderId: 0,
    OrderNo: '',
    PMethod: ''

  };
  orderItems: OrderItem[] = [];
  constructor() { }
}
