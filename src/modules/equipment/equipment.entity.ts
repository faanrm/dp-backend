import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  DeepPartial,
  JoinTable,
} from "typeorm";
import { ProductPlan } from "../productPlan/productPlan.entity";
import { EType, IState } from "./equipment.interface";
import { Material } from "../material/material.entity";
@Entity()
export class Equipment {
  @PrimaryGeneratedColumn("uuid")
  _id: string;
  @Column({ type: "enum", enum: IState, default: IState.available })
  state: IState;
  @Column({ type: "enum", enum: EType, default: EType.machineForProduction })
  type: EType;
  @Column()
  uptime: Date;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Material, (mat) => mat.equipments, {
    cascade: true,
  })
  @JoinTable({
    name: "operations",
    joinColumn: {
      name: "equipmentId",
      referencedColumnName: "_id",
    },
    inverseJoinColumn: {
      name: "materialId",
      referencedColumnName: "_id",
    },
  })
  materials: Material[];
  public clone(): Equipment {
    const clonedEquipment: DeepPartial<Equipment> = {
      state: this.state,
      type: this.type,
      uptime: this.uptime,
      materials: this.materials.map((material) => material.clone()),
    };
    const clone = Object.assign(new Equipment(), clonedEquipment);
    return clone;
  }
}
