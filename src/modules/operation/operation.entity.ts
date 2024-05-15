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
}
