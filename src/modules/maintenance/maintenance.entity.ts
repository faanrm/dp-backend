import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { MType } from "./maintenance.interface";
import { Equipment } from "../equipment/equipment.entity";
import { v4 as uuid } from "uuid";
@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn("uuid")
  _id: string;
  @Column({ type: "enum", enum: MType, default: MType.Repairing })
  type: MType;
  @Column()
  description: string;
  @Column({ type: "datetime" })
  date: Date;
  @ManyToOne(() => Equipment, (equipment) => equipment.maintenancePlans)
  @JoinColumn({ name: "equipmentId" })
  equipment: Equipment;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  public clone(): Maintenance {
    const clonedMaintenance = new Maintenance();
    clonedMaintenance._id = uuid();
    clonedMaintenance.description = this.description;
    clonedMaintenance.date = this.date;
    clonedMaintenance.created_at = this.created_at;
    clonedMaintenance.updated_at = this.updated_at;
    return clonedMaintenance;
  }
}
