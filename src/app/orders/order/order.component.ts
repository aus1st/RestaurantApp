import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
export class OrderComponent implements OnInit {
  constructor(public orderService: OrderService) { }

  resetForm(form?: NgForm) {

    form?.resetForm();
    this.orderService.formData = {
      CustomerId: 0,
      GTotal: 0,
      OrderId: 0,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      PMethod: ''
    }
    this.orderService.orderItems = [];
  }

  ngOnInit(): void {
    this.resetForm();
  }

  AddEditItem(OrderItemIndex?: number | null, OrderId?: number) { }

}


