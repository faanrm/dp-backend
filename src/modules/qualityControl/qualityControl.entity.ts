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
import { v4 as uuid } from "uuid";
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

  public clone(): QualityControl {
    const clonedQualityControl = new QualityControl();
    clonedQualityControl._id = uuid();
    clonedQualityControl.result = this.result;
    clonedQualityControl.created_at = this.created_at;
    clonedQualityControl.updated_at = this.updated_at;
    return clonedQualityControl;
  }
}
