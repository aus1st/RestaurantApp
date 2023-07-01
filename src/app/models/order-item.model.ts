import { Item } from "./item.model"

export interface OrderItem {
    OrderItemId: number | null
    OrderId: number
    ItemId: number
    Qty: number,
    Price: number,
    ItemName: string,
    //Item: Item
    Total: number

}