import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer.model';
import { OrderItem } from 'src/app/models/order-item.model';
import { CustomerService } from 'src/app/shared/customer.service';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
export class OrderComponent implements OnInit {
  constructor(public orderService: OrderService, private custServ: CustomerService,
    private toaster: ToastrService,
    private route: Router,
    private activeRoute: ActivatedRoute) { }

  custList: Customer[] = [];
  isValid: boolean = true;
  resetForm(form?: NgForm) {

    form?.resetForm();
    this.orderService.formData = {
      CustomerId: 0,
      GTotal: 0,
      OrderId: 0,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      PMethod: '',
      //CustomerName: ''
      DeletedEntries: ''
    }
    this.orderService.orderItems = [];
  }

  async ngOnInit(): Promise<void> {
    const orderId = this.activeRoute.snapshot.paramMap.get('id');
    if (orderId == null) {
      this.resetForm();
    } else {
      //get data from db based on orderID
      const data = await this.orderService.getOrderById(parseInt(orderId));
      console.log(data);
      this.orderService.formData = data.formData;
      this.orderService.orderItems = data.orderItems;

    }

    this.custServ.getCustomers().then((data) => {
      this.custList = data as Customer[];
    });
  }

  AddEditItem(OrderItemIndex?: number | null, OrderId?: number) { }

  validateForm() {
    this.isValid = true;
    if (this.orderService.formData.CustomerId == 0 || this.orderService.orderItems[0].ItemId == 0) {
      this.isValid = false;
      return false;
    } else return true;
  }


  async onSubmit(form: NgForm) {
    if (this.validateForm()) {
      try {
        const res = await this.orderService.saveOrder()

        console.log(res);
        this.resetForm();

      } catch (error) {
        //adding these code due to CORS error but data is being saved into db
        this.resetForm();
        console.log(error);
        this.toaster.success('Submitted Successfully', 'Restaurant App.');
        this.route.navigate(['/orders'])
      }



    }
  }

}


