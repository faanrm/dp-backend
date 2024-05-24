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
  @Column({ nullable: true, type: "timestamp" })
  startTime?: Date;
  @Column({ default: 6 })
  lifePoint: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Operation, (operation) => operation.equipmentO)
  @JoinTable({
    name: "operation-equipment",
    joinColumn: {
      name: "equipmentId",
      referencedColumnName: "_id",
    },
    inverseJoinColumn: {
      name: "operationId",
      referencedColumnName: "_id",
    },
  })
  operations: Operation[];

  @OneToMany(() => Maintenance, (maintenance) => maintenance.equipment, {
    cascade: true,
  })
  maintenancePlans: Maintenance[];
  public clone(): Equipment {
    const clonedEquipment: DeepPartial<Equipment> = {
      state: this.state,
      type: this.type,
      startTime: this.startTime,
    };
    const clone = Object.assign(new Equipment(), clonedEquipment);
    return clone;
  }
  get uptime(): number {
    if (!this.startTime) {
      return 0;
    }
    const currentTime = new Date();
    const diffInMilliseconds = currentTime.getTime() - this.startTime.getTime();
    return diffInMilliseconds / 1000;
  }
}
