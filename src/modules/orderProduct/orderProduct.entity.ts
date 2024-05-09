import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Product } from "../products/products.entity";
import { ProductPlan } from "../productPlan/productPlan.entity";

enum Status {
  in_progress,
  delivered,
  cancelled,
}
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.productOrders)
  product: Product;

  @OneToMany(() => ProductPlan, (productPlan) => productPlan.order_Product)
  product_Plans: ProductPlan[];
}
