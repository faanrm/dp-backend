import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { orderProduct } from "../orderProduct/orderProduct.entity";
import { Component } from "../components/components.entity";
import { QualityControl } from "../qualityControl/qualityControl.entity";
import { v4 as uuid } from "uuid";
@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column()
  name: string;
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

  @OneToMany(() => orderProduct, (productOrder) => productOrder.product, {
    cascade: true,
  })
  productOrders: orderProduct[];

  @OneToMany(() => Component, (component) => component.productC, {
    cascade: true,
  })
  components: Component[];
  @OneToMany(() => QualityControl, (qualityControl) => qualityControl.product)
  qualityControls: QualityControl[];

  public clone(): Product {
    const cloneProduct = new Product();
    cloneProduct._id = uuid();
    cloneProduct.name = this.name;
    cloneProduct.price = this.price;
    cloneProduct.description = this.description;
    cloneProduct.quantity = this.quantity;
    return cloneProduct;
  }
}
