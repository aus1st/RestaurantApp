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

  // @Input()
  // orderId!: number;
  // enableControls: boolean = false;
  isValid: boolean = true;

  formData: OrderItem = {
    ItemId: 0,
    OrderId: 0,
    OrderItemId: null,
    ItemName: '',
    Price: 0,
    Qty: 0,
    Total: 0,
    //Item: { ItemId: 0, ItemName: '', price: 0 }
  };

  onSubmit(form: NgForm) {
    this.validateForm();
    console.log(form.value)
    if (this.isValid) {
      this.orderService.orderItems.push(form.value);
      this.orderService.updateGrandTotal();
      this.resetForm();
    }

  }

  deleteItem(idx: number) {

    const o = this.orderService.orderItems.splice(idx, 1);
    console.log(o);
    //console.log(this.orderService.formData.DeletedEntries);
    o.map(item => {
      if (item.OrderItemId !== 0) {
        this.orderService.formData.DeletedEntries += (item.OrderItemId?.toString() as string)
        const di = this.orderService.formData.DeletedEntries.replace('null', '');
        this.orderService.formData.DeletedEntries = di + ",";
        //this.orderService.formData.DeletedEntries += (item.OrderItemId?.toString() as string) + ",";
      }
    })
    console.log(this.orderService.formData.DeletedEntries);
    this.orderService.updateGrandTotal();
  }

  validateForm() {
    this.isValid = true;
    if (this.formData.ItemId !== 0 && this.formData.Qty > 0) {
      this.isValid = true
    } else this.isValid = false;
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
      this.formData.Price = this.items[event.selectedIndex - 1].price;
      this.formData.ItemName = this.items[event.selectedIndex - 1].ItemName;
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

  getPriceEditCtrls(event: any, idx: number) {
    if (event.selectedIndex == 0) {
      this.orderService.orderItems[idx].Price = 0;
      this.orderService.orderItems[idx].ItemName = '';

      //this.orderService.orderItems[idx].Qty = this.items[event.selectedIndex - 1].ItemName;

      this.formData.Price = 0;
      this.formData.ItemName = ''
    } else {
      this.orderService.orderItems[idx].Price = this.items[event.selectedIndex - 1].price;
      this.orderService.orderItems[idx].ItemName = this.items[event.selectedIndex - 1].ItemName;
      //this.updateAmount();
      //updateAmountEditCtrls();
      console.log(this.orderService.orderItems[idx])
    }

    console.log(event.selectedIndex, idx);
    console.log(event);
    console.log(event)
  }


  updateAmountEditCtrls(event: any, idx: number) {
    this.orderService.orderItems[idx].Qty = event.target.value;
    this.orderService.orderItems[idx].Total = parseFloat((this.orderService.orderItems[idx].Qty * this.orderService.orderItems[idx].Price).toFixed(2));
    console.log(this.orderService.orderItems[idx])
  }

  // toggleDtlsControls() {
  //   this.enableControls = true;
  // }

}
