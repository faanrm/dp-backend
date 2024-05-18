import { DeepPartial } from "typeorm";
import { Maintenance } from "./maintenance.entity";
import { IMaintenance, MType } from "./maintenance.interface";
export const maintenanceServices = (server) => {
  const createMaintenance = async (
    data: DeepPartial<Maintenance>
  ): Promise<Maintenance> => {
    const createdMaintenance = new Maintenance().clone();
    createdMaintenance.description = data.description;
    createdMaintenance.date = data.date as Date;
    createdMaintenance.type = data.type as MType;
    if (data.equipment) {
      const equipment = await server.db.equipments.findOne(data.equipment._id);
      if (equipment) {
        createdMaintenance.equipment = equipment;
      } else {
        throw new Error("Equipment not found");
      }
    }

    return await server.db.maintenances.save(createdMaintenance);
  };

  const updateMaintenance = async (
    id: string,
    data: DeepPartial<Maintenance>
  ): Promise<Maintenance> => {
    const maintenance = await server.db.maintenances.findOne({ _id: id });
    if (!maintenance) {
      throw new Error("Maintenance not found");
    }
    Object.assign(maintenance, data);

    if (data.equipment) {
      const equipment = await server.db.equipments.findOne(data.equipment._id);
      if (equipment) {
        maintenance.equipment = equipment;
      } else {
        throw new Error("New equipment not found");
      }
    }

    return await server.db.maintenances.save(maintenance);
  };
  const deleteMaintenance = async (id: string): Promise<void> => {
    const maintenance = await server.db.maintenances.delete(id);
    if (!maintenance) {
      throw new Error("Maintenance not found");
    }
    return maintenance;
  };
  const getAllMaintenance = async (): Promise<IMaintenance[]> => {
    const maintenance = await server.db.maintenances.find();
    return maintenance;
  };
  return {
    createMaintenance,
    updateMaintenance,
    deleteMaintenance,
    getAllMaintenance,
  };
};
