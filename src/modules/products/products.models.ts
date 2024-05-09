import { IProduct } from "./products.interface";

class ProductBuilder {
  private quantity: number;
  private description: string;
  private price: number;

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

  build(): IProduct {
    return {
      quantity: this.quantity,
      description: this.description,
      price: this.price,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

const products = new ProductBuilder();
export default products;
