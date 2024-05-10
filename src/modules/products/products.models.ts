import { IProduct } from "./products.interface";
import { Equipment } from "../equipment/equipment.entity";
class ProductBuilder {
  private quantity: number;
  private description: string;
  private price: number;
  private equipments: Equipment[];

  constructor() {}

  setQuantity(quantity: number): ProductBuilder {
    this.quantity = quantity;
    return this;
  }

  setDescription(description: string): ProductBuilder {
    this.description = description;
    return this;
  }

  setPrice(price: number): ProductBuilder {
    this.price = price;
    return this;
  }

  setEquipments(equipments: Equipment[]): ProductBuilder {
    this.equipments = equipments;
    return this;
  }

  build(): IProduct {
    return {
      quantity: this.quantity,
      description: this.description,
      price: this.price,
      productOrders: [],
      equipments: this.equipments,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

const products = new ProductBuilder();
export default products;
