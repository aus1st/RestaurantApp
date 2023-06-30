import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { OrderItem } from 'src/app/models/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-item-dtls',
  templateUrl: './item-dtls.component.html',
  styleUrls: ['./item-dtls.component.css']
})
export class ItemDtlsComponent implements OnInit {


  constructor(public orderService: OrderService, private itemService: ItemService) { }

  @Input()
  orderId!: number;


  formData: OrderItem = {
    ItemId: 0,
    OrderId: 0,
    OrderItemId: 0,
    ItemName: '',
    Price: 0,
    Qty: 0,
    Total: 0
  };

  onSubmit(form: NgForm) {
    console.log(form.value)
    this.orderService.orderItems.push(form.value);
    this.resetForm();
  }

  items: Item[] = [];

  getFoodItems() {
    this.itemService.getItems().then((data) => {
      this.items = data as Item[];
    }).catch(err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
    this.getFoodItems();
    this.resetForm();
  }

  getPrice(event: any) {
    if (event.selectedIndex == 0) {
      this.formData.Price = 0;
      this.formData.ItemName = ''
    } else {
      this.formData.Price = this.items[event.selectedIndex].price;
      this.formData.ItemName = this.items[event.selectedIndex].ItemName;
      this.updateAmount();
    }
  }

  updateAmount() {
    this.formData.Total = parseFloat((this.formData.Qty * this.formData.Price).toFixed(2));
  }

  resetForm() {
    this.formData.ItemId = 0,
      this.formData.OrderId = 0,
      this.formData.OrderItemId = 0,
      this.formData.ItemName = '',
      this.formData.Price = 0,
      this.formData.Qty = 0,
      this.formData.Total = 0

  }

}
