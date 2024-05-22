import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
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
  @ManyToMany(() => Product, (product) => product.components, {
    cascade: true,
  })
  @JoinTable({
    name: "components-product",
    joinColumn: {
      name: "componentId",
      referencedColumnName: "_id",
    },
    inverseJoinColumn: {
      name: "productId",
      referencedColumnName: "_id",
    },
  })
  productC: Product[];
  @ManyToMany(() => Material, (material) => material.components, {
    cascade: true,
  })
  @JoinTable({
    name: "components-material",
    joinColumn: {
      name: "componentId",
      referencedColumnName: "_id",
    },
    inverseJoinColumn: {
      name: "materialId",
      referencedColumnName: "_id",
    },
  })
  materialC: Material[];
  public clone(): Component {
    const clonedComponent = new Component();
    clonedComponent._id = uuid();
    clonedComponent.quantity = this.quantity;
    return clonedComponent;
  }

  public setProduct(product: Product[]): void {
    this.productC = product;
  }

  public setMaterial(material: Material[]): void {
    this.materialC = material;
  }
}
