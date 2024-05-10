import { orderProduct } from "../orderProduct/orderProduct.entity";
import { Equipment } from "../equipment/equipment.entity";
export interface IProduct {
  quantity: number;
  description: string;
  price: number;
  productOrders: orderProduct[];
  equipments: Equipment[];
  created_at: Date;
  updated_at: Date;
}
