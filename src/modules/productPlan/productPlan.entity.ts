import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Status } from "./productPlan.interface";
@Entity()
export class ProductPlan {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column()
  startTime: Date;
  @Column()
  endTime: Date;

  @Column({ type: "enum", enum: Status, default: Status.in_progress })
  status: Status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
