export interface Order {
    OrderId: number | null,
    CustomerId: number,
    OrderNo: string,
    PMethod: string,
    GTotal: number,
    //CustomerName: ''
    DeletedEntries: string
}

