import { Product } from "./products.entity";

class ProductBuilder {
  private product: Product;

  constructor() {
    this.product = Object.create(Product.prototype);
  }
  setName(name: string): ProductBuilder {
    this.product.name = name;
    return this;
  }
  setQuantity(quantity: number): ProductBuilder {
    this.product.quantity = quantity;
    return this;
  }

  setDescription(description: string): ProductBuilder {
    this.product.description = description;
    return this;
  }

  setPrice(price: number): ProductBuilder {
    this.product.price = price;
    return this;
  }

  build(): Product {
    return this.product;
  }
}

export { ProductBuilder };
