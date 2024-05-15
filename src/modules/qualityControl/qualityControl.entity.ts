import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Result } from "./qualityControl.interface";
import { Product } from "../products/products.entity";
@Entity()
export class QualityControl {
  @PrimaryGeneratedColumn("uuid")
  _id: string;
  @Column({ type: "enum", enum: Result, default: Result.Good })
  result: Result;
  @ManyToOne(() => Product, (product) => product.qualityControls)
  @JoinColumn({ name: "productId" })
  product: Product;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
