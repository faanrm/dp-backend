import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  DeepPartial,
} from "typeorm";
import { ProductPlan } from "../productPlan/productPlan.entity";
enum EType {
  machineForQuality,
  machineForMaintain,
  machineForProduction,
}
enum State {
  available,
  unavailable,
  maintenance,
  out,
}
@Entity()
export class Equipment {
  @PrimaryGeneratedColumn("uuid")
  _id: string;
  @Column({ type: "enum", enum: State, default: State.available })
  state: State;
  @Column({ type: "enum", enum: EType, default: EType.machineForProduction })
  type: EType;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToMany(() => ProductPlan, (operation) => operation.equipment)
  productPlans: ProductPlan[];
  public clone(): Equipment {
    const clonedEquipment: DeepPartial<Equipment> = {
      state: this.state,
      type: this.type,
      productPlans: this.productPlans.map((plan) => plan.clone()),
    };
    const clone = Object.assign(new Equipment(), clonedEquipment);
    return clone;
  }
}
