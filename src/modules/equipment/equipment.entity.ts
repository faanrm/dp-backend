import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  DeepPartial,
  JoinTable,
  OneToMany,
} from "typeorm";
import { EType, IState } from "./equipment.interface";
import { Maintenance } from "../maintenance/maintenance.entity";
import { Material } from "../material/material.entity";
@Entity()
export class Equipment {
  @PrimaryGeneratedColumn("uuid")
  _id: string;
  @Column({ type: "enum", enum: IState, default: IState.available })
  state: IState;
  @Column({ type: "enum", enum: EType, default: EType.machineForProduction })
  type: EType;
  @Column({ nullable: true })
  uptime?: Date;
  @Column({ default: 6 })
  lifePoint: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Material, (mat) => mat.equipment)
  @JoinTable({
    name: "operations",
    joinColumn: {
      name: "equipmentIde",
      referencedColumnName: "_id",
    },
    inverseJoinColumn: {
      name: "materialId",
      referencedColumnName: "_id",
    },
  })
  materials: Material[];

  @OneToMany(() => Maintenance, (maintenance) => maintenance.equipment, {
    cascade: true,
  })
  maintenancePlans: Maintenance[];
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
