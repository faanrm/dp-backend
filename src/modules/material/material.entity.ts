import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Component } from "../components/components.entity";
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
  @ManyToMany(() => Component, (component) => component.materialC)
  @JoinTable({
    name: "components-material",
    joinColumn: {
      name: "materialId",
      referencedColumnName: "_id",
    },
    inverseJoinColumn: {
      name: "componentId",
      referencedColumnName: "_id",
    },
  })
  components: Component[];
  @ManyToMany(() => Operation, (operation) => operation.equipmentO)
  @JoinTable({
    name: "operation-material",
    joinColumn: {
      name: "materialId",
      referencedColumnName: "_id",
    },
    inverseJoinColumn: {
      name: "operationId",
      referencedColumnName: "_id",
    },
  })
  operations: Operation[];
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
