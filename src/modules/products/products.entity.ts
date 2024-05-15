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
import { Material } from "../material/material.entity";
import { QualityControl } from "../qualityControl/qualityControl.entity";
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

  @ManyToMany(() => Material, (material) => material.products, {
    cascade: true,
  })
  @JoinTable({
    name: "components",
    joinColumn: {
      name: "productId",
      referencedColumnName: "_id",
    },
    inverseJoinColumn: {
      name: "materialId",
      referencedColumnName: "_id",
    },
  })
  materials: Material[];
  @OneToMany(() => QualityControl, (qualityControl) => qualityControl.product)
  qualityControls: QualityControl[];

  public clone(): Product {
    return Object.assign(Object.create(Product.prototype), {
      _id: this._id,
      quantity: this.quantity,
      description: this.description,
      price: this.price,
    }) as Product;
  }
}
