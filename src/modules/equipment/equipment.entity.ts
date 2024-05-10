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
import { EType, IState } from "./equipment.interface";
import { Product } from "../products/products.entity";
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
  @ManyToMany(() => ProductPlan, (operation) => operation.equipment)
  productPlans: ProductPlan[];
  @ManyToMany(() => Product, (product) => product.equipments)
  products: Product[];
  public clone(): Equipment {
    const clonedEquipment: DeepPartial<Equipment> = {
      state: this.state,
      type: this.type,
      uptime: this.uptime,
      productPlans: this.productPlans.map((plan) => plan.clone()),
      products: this.products.map((product) => product.clone()),
    };
    const clone = Object.assign(new Equipment(), clonedEquipment);
    return clone;
  }
}
