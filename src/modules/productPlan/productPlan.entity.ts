import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Status } from "./productPlan.interface";
import { Operation } from "../operation/operation.entity";
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
  @OneToMany(() => Operation, (operation) => operation.productPlan)
  operations: Operation[];
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
