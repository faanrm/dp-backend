import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "../products/products.entity";
import { Material } from "../material/material.entity";

@Entity("components")
export class Component {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "productId" })
  product: Product;

  @ManyToOne(() => Material)
  @JoinColumn({ name: "materialId" })
  material: Material;
}
