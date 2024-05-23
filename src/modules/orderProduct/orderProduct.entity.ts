import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  DeepPartial,
} from "typeorm";
import { Product } from "../products/products.entity";
import { Status } from "./orderProduct.interface";
import { v4 as uuid } from "uuid";
@Entity()
export class orderProduct {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column()
  order_quantity: number;

  @Column()
  order_date: Date;

  @Column()
  delivery_date: Date;

  @Column({ type: "enum", enum: Status, default: Status.in_progress })
  status: Status;
  @Column()
  order_number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.productOrders)
  product: Product;

  public clone(): orderProduct {
    const clonedOrderProduct: DeepPartial<orderProduct> = {
      _id: uuid(),
      order_quantity: this.order_quantity,
      order_date: this.order_date,
      delivery_date: this.delivery_date,
      status: this.status,
    };
    const clone = Object.assign(new orderProduct(), clonedOrderProduct);
    return clone;
  }
}
