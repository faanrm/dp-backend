import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Component } from "../components/components.entity";
import { Equipment } from "../equipment/equipment.entity";
import { Operation } from "../operation/operations.entity";
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
  @OneToMany(() => Component, (component) => component.materialC)
  components: Component[];
  @OneToMany(() => Operation, (operation) => operation.materialO)
  operations: Operation;
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
