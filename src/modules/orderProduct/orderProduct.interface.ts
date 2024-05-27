import { DeepPartial } from "typeorm";
import { Product } from "../products/products.entity";
import { orderProduct } from "./orderProduct.entity";
export interface OrderProductFactory {
  createOrderProduct(product: Product, orderQuantity: number): orderProduct;
}
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

export interface IIterator<T> {
  hasNext(): boolean;
  next(): T;
}

export interface IAggregate<T> {
  createIterator(): IIterator<T>;
}

export class OrderProductIterator implements IIterator<orderProduct> {
  private collection: orderProduct[];
  private index: number;

  constructor(collection: orderProduct[]) {
    this.collection = collection;
    this.index = 0;
  }

  hasNext(): boolean {
    return this.index < this.collection.length;
  }

  next(): orderProduct {
    const result = this.collection[this.index];
    this.index++;
    return result;
  }
}

export class OrderProductCollection implements IAggregate<orderProduct> {
  private collection: orderProduct[] = [];

  add(orderProduct: orderProduct): void {
    this.collection.push(orderProduct);
  }

  remove(orderProduct: orderProduct): void {
    const index = this.collection.indexOf(orderProduct, 0);
    if (index > -1) {
      this.collection.splice(index, 1);
    }
  }

  createIterator(): IIterator<orderProduct> {
    return new OrderProductIterator(this.collection);
  }
}
