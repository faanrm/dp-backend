import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToMany,
} from "typeorm";
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
    return Object.assign(Object.create(Material.prototype), {
      _id: this._id,
      name: this.name,
      inventoryLevel: this.inventoryLevel,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }) as Material;
  }
}
