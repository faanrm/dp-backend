import { IProductPlan } from "../productPlan/productPlan.interface";
export interface IEquipment {
  _id: string;
  state: IState;
  type: EType;
  uptime?: Date;
  created_at: Date;
  updated_at: Date;
  productPlans: IProductPlan[];
}

export enum EType {
  machineForQuality,
  machineForMaintain,
  machineForProduction,
}

export enum IState {
  available,
  unavailable,
  maintenance,
  out,
}
