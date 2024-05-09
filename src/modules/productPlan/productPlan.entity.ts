import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  DeepPartial,
} from "typeorm";
import { orderProduct } from "../orderProduct/orderProduct.entity";
import { Equipment } from "../equipment/equipment.entity";
enum Status {
  in_progress,
  finish,
}
@Entity()
export class ProductPlan {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column()
  estimate_duration: Date;

  @Column()
  real_date: Date;

  @Column({ type: "enum", enum: Status, default: Status.in_progress })
  status: Status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => orderProduct, (orderProduct) => orderProduct.product_Plans)
  order_Product: orderProduct;

  @ManyToMany(() => Equipment)
  @JoinTable()
  equipment: Equipment[];
  public clone(): ProductPlan {
    const clonedProductPlan: DeepPartial<ProductPlan> = {
      estimate_duration: this.estimate_duration,
      real_date: this.real_date,
      status: this.status,
      equipment: this.equipment.map((equipment) => equipment.clone()),
    };
    const clone = Object.assign(new ProductPlan(), clonedProductPlan);
    return clone;
  }
}
