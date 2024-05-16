import { DeepPartial } from "typeorm";
import { Maintenance } from "./maintenance.entity";
import { IMaintenance, MType } from "./maintenance.interface";
export const maintenanceServices = (server) => {
  const createMaintenance = async (
    data: DeepPartial<IMaintenance>
  ): Promise<IMaintenance> => {
    const createdMaintenance = new Maintenance().clone();
    createdMaintenance.description = data.description;
    createdMaintenance.date = data.date as Date;
    createdMaintenance.type = data.type as MType;
    const equipmentId = data.equipmentId;
    const equipment = await server.db.equipments.findOne({ _id: equipmentId });
    if (equipment) {
      createdMaintenance.equipment = equipment;
    } else {
      throw new Error("Equipment not found");
    }
    return await server.db.maintenances.save(createdMaintenance);
  };
  return {
    createMaintenance,
  };
};
