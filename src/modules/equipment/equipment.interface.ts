import { Maintenance } from "../maintenance/maintenance.entity";
import { Equipment } from "./equipment.entity";
export interface IEquipment {
  _id: string;
  state: IState;
  name: string;
  type: EType;
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
export interface IEquipmentFactory {
  createMachine(name?: string, uptime?: Date): Equipment;
}

class MachineForProductionFactory implements IEquipmentFactory {
  createMachine(name?: string, startTime?: Date): Equipment {
    const machine = new Equipment();
    machine.type = EType.machineForProduction;
    machine.name = name;
    //    machine.startTime = new Date();
    return machine;
  }
}

class MachineForQualityFactory implements IEquipmentFactory {
  createMachine(name?: string, uptime?: Date): Equipment {
    const machine = new Equipment();
    machine.type = EType.machineForQuality;
    machine.name = name;
    // machine.startTime = new Date();
    return machine;
  }
}

class MachineForMaintainFactory implements IEquipmentFactory {
  createMachine(name?: string, uptime?: Date): Equipment {
    const machine = new Equipment();
    machine.type = EType.machineForMaintain;
    machine.name = name;
    //machine.startTime = new Date();
    return machine;
  }
}
const machineForProduction = new MachineForProductionFactory();
const machineForQuality = new MachineForQualityFactory();
const machineForMaintain = new MachineForMaintainFactory();

export { machineForProduction, machineForQuality, machineForMaintain };
