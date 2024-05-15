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

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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
}
