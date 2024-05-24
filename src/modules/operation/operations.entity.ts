import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { ProductPlan } from "../productPlan/productPlan.entity";
import { Equipment } from "../equipment/equipment.entity";
import { Material } from "../material/material.entity";
import { v4 as uuid } from "uuid";
import { OperationState } from "./operation.interface";
import { EquipmentUsage } from "../equipmentUsage/equipment.usage.entity";
@Entity()
export class Operation {
  @PrimaryGeneratedColumn("uuid")
  _id: string;
  @Column()
  duration: Date;
  @Column({
    type: "enum",
    enum: OperationState,
    default: OperationState.in_progress,
  })
  state: string;
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

  @OneToMany(() => EquipmentUsage, (equipmentUsage) => equipmentUsage.operation)
  equipmentUsages: EquipmentUsage[];
  public clone(): Operation {
    const clonedOperation = new Operation();
    clonedOperation._id = uuid();
    clonedOperation.duration = this.duration;
    clonedOperation.state = this.state;
    return clonedOperation;
  }
  public setEquipment(equipment: Equipment[]): void {
    this.equipmentO = equipment;
  }
  public setMaterial(material: Material[]): void {
    this.materialO = material;
  }
}
