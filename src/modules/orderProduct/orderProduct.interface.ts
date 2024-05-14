export interface IOrderProduct {
  _id: string;
  order_quantity: number;
  order_date: Date;
  delivery_date: Date;
  status: Status;
  created_at: Date;
  updated_at: Date;
  order_number: number;
  product: any;
  product_Plans: any[];
}
enum Status {
  in_progress,
  delivered,
  cancelled,
}
