import { DeepPartial } from "typeorm";
import { Product } from "../products/products.entity";

export interface IOrderProduct {
  _id: string;
  order_quantity: number;
  order_date: Date;
  delivery_date: Date;
  status: Status;
  created_at: Date;
  updated_at: Date;
  order_number: number;
  product: DeepPartial<Product>;
}

export enum Status {
  in_progress,
  delivered,
  cancelled,
}
