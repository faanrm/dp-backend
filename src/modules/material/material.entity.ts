import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "../products/products.entity";
import { Equipment } from "../equipment/equipment.entity";
@Entity()
export class Material {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column()
  name: string;

  @Column()
  inventoryLevel: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  @ManyToMany(() => Product, (product) => product.materials)
  products: Product[];
  @ManyToMany(() => Equipment, (eqp) => eqp.materials)
  equipments: Equipment[];
  public clone(): Material {
    const clonedMaterial = new Material();
    clonedMaterial._id = uuid();
    clonedMaterial.name = this.name;
    clonedMaterial.inventoryLevel = this.inventoryLevel;
    clonedMaterial.description = this.description;
    clonedMaterial.created_at = this.created_at;
    clonedMaterial.updated_at = this.updated_at;
    return clonedMaterial;
  }
}
