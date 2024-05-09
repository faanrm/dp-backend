import { orderProduct } from "../orderProduct/orderProduct.entity";
export interface IProduct {
  quantity: number;
  description: string;
  price: number;
  productOrders: orderProduct[];
  created_at: Date;
  updated_at: Date;
}
