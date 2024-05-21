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
import { v4 as uuid } from "uuid";
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

  @ManyToOne(() => Product, (product) => product.components)
  productC: Product;
  @ManyToOne(() => Product, (product) => product.components)
  materialC: Material;

  public clone(): Component {
    const clonedComponent = new Component();
    clonedComponent._id = uuid();
    clonedComponent.quantity = this.quantity;
    return clonedComponent;
  }

  public setProduct(product: Product): void {
    this.productC = product;
  }

  public setMaterial(material: Material): void {
    this.materialC = material;
  }
}
