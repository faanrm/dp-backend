import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeepPartial,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { EType, IState } from "./equipment.interface";
import { Maintenance } from "../maintenance/maintenance.entity";
import { Operation } from "../operation/operations.entity";
import { EquipmentUsage } from "../equipmentUsage/equipment.usage.entity";
@Entity()
export class Equipment {
  @PrimaryGeneratedColumn("uuid")
  _id: string;
  @Column({ type: "enum", enum: IState, default: IState.available })
  state: IState;
  @Column({ type: "enum", enum: EType, default: EType.machineForProduction })
  type: EType;
  @Column({ nullable: true })
  name?: string;
  @Column({ default: 6 })
  lifePoint: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Operation, (operation) => operation.equipmentO)
  operations: Operation[];

  @OneToMany(() => Maintenance, (maintenance) => maintenance.equipment, {
    cascade: true,
  })
  maintenancePlans: Maintenance[];
  @OneToMany(() => EquipmentUsage, (equipmentUsage) => equipmentUsage.equipment)
  equipmentUsages: EquipmentUsage[];
  public clone(): Equipment {
    const clonedEquipment: DeepPartial<Equipment> = {
      state: this.state,
      type: this.type,
    };
    const clone = Object.assign(new Equipment(), clonedEquipment);
    return clone;
  }
}
