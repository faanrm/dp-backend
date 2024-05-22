import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ProductPlan } from "../productPlan/productPlan.entity";
import { Equipment } from "../equipment/equipment.entity";
import { Material } from "../material/material.entity";
import { v4 as uuid } from "uuid";
@Entity()
export class Operation {
  @PrimaryGeneratedColumn("uuid")
  _id: string;
  @Column()
  duration: Date;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToMany(() => Equipment, (equipment) => equipment.operations, {
    cascade: true,
  })
  @JoinTable({
    name: "operation-equipment",
    joinColumn: {
      name: "operationId",
      referencedColumnName: "_id",
    },
    inverseJoinColumn: {
      name: "equipmentId",
      referencedColumnName: "_id",
    },
  })
  equipmentO: Equipment[];
  @ManyToMany(() => Material, (material) => material.operations, {
    cascade: true,
  })
  @JoinTable({
    name: "operation-material",
    joinColumn: {
      name: "operationId",
      referencedColumnName: "_id",
    },
    inverseJoinColumn: {
      name: "materialId",
      referencedColumnName: "_id",
    },
  })
  materialO: Material[];
  @ManyToOne(() => ProductPlan, (productPlan) => productPlan.operations)
  productPlan: ProductPlan;
  public clone(): Operation {
    const clonedOperation = new Operation();
    clonedOperation._id = uuid();
    clonedOperation.duration = this.duration;
    return clonedOperation;
  }
  public setEquipment(equipment: Equipment[]): void {
    this.equipmentO = equipment;
  }
  public setMaterial(material: Material[]): void {
    this.materialO = material;
  }
}