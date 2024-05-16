import { Equipment } from "../equipment/equipment.entity";

export enum MType {
  Cleaning,
  Repairing,
}

export interface IMaintenance {
  _id?: string;
  description: string;
  date: Date;
  type: MType;
  equipmentId?: string;
  equipment?: Equipment[];
  created_at: Date;
  updated_at: Date;
}
