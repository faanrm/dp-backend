import { Maintenance } from "../maintenance/maintenance.entity";
export interface IEquipment {
  _id: string;
  state: IState;
  type: EType;
  uptime?: Date;
  created_at: Date;
  updated_at: Date;
  maintenancePlans: Maintenance[];
}

export enum EType {
  machineForQuality,
  machineForMaintain,
  machineForProduction,
}

export enum IState {
  available,
  busy,
  unavailable,
  maintenance,
  out,
}
