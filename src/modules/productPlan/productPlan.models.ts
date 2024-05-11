import { IOrderProduct } from "../orderProduct/orderProduct.interface";
import { IEquipment } from "../equipment/equipment.interface";
import { Status, IProductPlan } from "./productPlan.interface";

class ProductPlanBuilder {
  private estimate_duration: Date;
  private real_date: Date;
  private status: Status;
  private order_Product: IOrderProduct;
  private equipment: IEquipment[];
  constructor() {}

  setEstimate_Duration(estimate_duration: Date): ProductPlanBuilder {
    this.estimate_duration = estimate_duration;
    return this;
  }

  setReal_Date(real_date: Date): ProductPlanBuilder {
    this.real_date = real_date;
    return this;
  }

  setStatus(status: Status): ProductPlanBuilder {
    this.status = status;
    return this;
  }

  setOrder_Product(order_Product: IOrderProduct): ProductPlanBuilder {
    this.order_Product = order_Product;
    return this;
  }

  setEquipment(equipments: IEquipment[]): ProductPlanBuilder {
    this.equipment = equipments;
    return this;
  }

  build(): IProductPlan {
    return {
      estimate_duration: this.estimate_duration,
      real_date: this.real_date,
      status: this.status,
      order_Product: this.order_Product,
      equipment: this.equipment,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

const productPlan = new ProductPlanBuilder();
export default productPlan;
