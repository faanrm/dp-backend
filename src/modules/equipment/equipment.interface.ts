import { IProductPlan } from "../productPlan/productPlan.interface";
export interface IEquipment {
  _id: string;
  state: State;
  type: EType;
  created_at: Date;
  updated_at: Date;
  productPlans: IProductPlan[];
}

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
