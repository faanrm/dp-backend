import { IOrderProduct } from "../orderProduct/orderProduct.interface";
import { IEquipment } from "../equipment/equipment.interface";
export interface IProductPlan {
  estimate_duration: Date;
  real_date: Date;
  status: Status;
  order_Product: IOrderProduct;
  equipment: IEquipment[];
  created_at: Date;
  updated_at: Date;
}

export enum Status {
  in_progress,
  finish,
}
