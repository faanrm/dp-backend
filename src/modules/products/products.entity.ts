/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { orderProduct } from "../orderProduct/orderProduct.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column()
  quantity: number;

  @Column()
  description: string;
  @Column()
  price: number;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => orderProduct, (productOrder) => productOrder.product)
  productOrders: orderProduct[];
}
