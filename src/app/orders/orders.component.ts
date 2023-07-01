import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

type orders = {
  OrderId: number,
  OrderNo: string,
  Customer: string,
  PMethod: string,
  GTotal: number
}


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orderList: orders[] = []

  constructor(private orderServ: OrderService, private router: Router,
    private toast: ToastrService) { }


  async ngOnInit() {
    await this.getOrderList();
  }

  async getOrderList() {
    this.orderList = await this.orderServ.getOrders();
  }

  openForEdit(orderId: number) {
    this.router.navigate([`/order/edit/${orderId}`])
  }

  async deleteOrder(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      const res = await this.orderServ.deleteOrder(id);
      await this.getOrderList();
      this.toast.warning('Record Deleted', 'Restaurant App.');
    }
  }

}
