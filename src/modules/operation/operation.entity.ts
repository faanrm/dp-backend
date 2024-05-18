import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ProductPlan } from "../productPlan/productPlan.entity";
import { Equipment } from "../equipment/equipment.entity";
import { Material } from "../material/material.entity";
import { v4 as uuid } from "uuid";
@Entity("operations")
export class Operation {
  @PrimaryGeneratedColumn("uuid")
  _id: string;
  @Column()
  duration: Date;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne(() => Equipment)
  @JoinColumn({ name: "equipmentId" })
  equipment: Equipment;
  @ManyToOne(() => Material)
  @JoinColumn({ name: "materialId" })
  material: Material;
  @ManyToOne(() => ProductPlan, (productPlan) => productPlan.operations)
  @JoinColumn({ name: "productPlanId" })
  productPlan: ProductPlan;
  public clone(): Operation {
    const clonedOperation = new Operation();
    clonedOperation._id = uuid();
    clonedOperation.duration = this.duration;
    return clonedOperation;
  }
  public setEquipment(equipment: Equipment): void {
    this.equipment = equipment;
  }
  public setMaterial(material: Material): void {
    this.material = material;
  }
}
