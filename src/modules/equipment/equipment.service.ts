import { DeepPartial } from "typeorm";
import { Equipment } from "./equipment.entity";
import { IEquipment, EType, IState } from "./equipment.interface";
import {
  machineForMaintain,
  machineForProduction,
  machineForQuality,
} from "./equipment.interface";
import { IEquipmentFactory } from "./equipment.interface";

export const equipmentService = (server) => {
  const createEquipment = async (
    equipmentData: DeepPartial<IEquipment>
  ): Promise<IEquipment> => {
    let machineFactory: IEquipmentFactory;

    switch (equipmentData.type) {
      case EType.machineForProduction:
        machineFactory = machineForProduction;
        break;
      case EType.machineForQuality:
        machineFactory = machineForQuality;
        break;
      case EType.machineForMaintain:
        machineFactory = machineForMaintain;
        break;
      default:
        throw new Error(`Invalid equipment type: ${equipmentData.type}`);
    }
    const machine = machineFactory.createMachine(equipmentData.name);
    Object.assign(machine, equipmentData);
    return await server.db.equipments.save(machine);
  };
  const getAllEquipment = async (options?: {
    state?: IState | undefined;
    type?: EType[] | undefined;
  }): Promise<IEquipment[]> => {
    const query = server.db.equipments.createQueryBuilder("equipment");

    if (options?.state) {
      query.where("equipment.state = :state", { state: options.state });
    }

    if (options?.type) {
      query.andWhere("equipment.type IN (:...type)", { type: options.type });
    }

    return await query.getMany();
  };

  const getOneEquipment = async (id: string): Promise<Equipment> => {
    const equipment = await server.db.equipments.find({ where: { _id: id } });
    return equipment;
  };

  const updateEquipment = async (
    id: string,
    equipmentData: DeepPartial<IEquipment>
  ): Promise<IEquipment> => {
    const equipmentToUpdate = await server.db.equipments.findOne({
      _id: id,
    });

    if (!equipmentToUpdate) {
      throw new Error("Equipment not found");
    }

    Object.assign(equipmentToUpdate, equipmentData);
    return await server.db.equipments.save(equipmentToUpdate);
  };
  const deleteEquipment = async (id: string): Promise<void> => {
    const equipment = await server.db.equipments.delete(id);
    if (!equipment) {
      throw new Error("Equipment not found");
    }
    return equipment;
  };
  const changeEquipmentState = async (id: string): Promise<IEquipment> => {
    const equipmentToUpdate = await server.db.equipments.findOne({ _id: id });
    if (!equipmentToUpdate) {
      throw new Error("Equipment not found");
    }
    equipmentToUpdate.state = IState;
    return await server.db.equipments.save(equipmentToUpdate);
  };
  const decrementLifePoint = async (id: string): Promise<IEquipment> => {
    const equipment = await server.db.equipments.findOne({ _id: id });
    if (!equipment) {
      throw new Error("Equipment no found");
    }
    equipment.lifePoint = equipment.lifePoint - 1;
    return await server.db.equipments.save(equipment);
  };

  const getMaintenanceHistory = async (id: string): Promise<IEquipment> => {
    const equipment = await server.db.equipments.findOne({
      where: { _id: id },
      relations: ["maintenancePlans"],
    });

    if (!equipment) {
      throw new Error("Equipment not found");
    }

    return equipment;
  };

  return {
    changeEquipmentState,
    createEquipment,
    getAllEquipment,
    getOneEquipment,
    updateEquipment,
    deleteEquipment,
    decrementLifePoint,
    getMaintenanceHistory,
  };
};
