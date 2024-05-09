import { Repository, DeepPartial } from "typeorm";
import { Equipment } from "./equipment.entity";
import { IEquipment } from "./equipment.interface";

export const equipmentService = (server) => {
  const createEquipment = async (
    equipmentData: DeepPartial<IEquipment>
  ): Promise<IEquipment> => {
    const clonedEquipment = new Equipment().clone();
    Object.assign(clonedEquipment, equipmentData);
    return await server.db.equipments.save(clonedEquipment);
  };

  const getAllEquipment = async (): Promise<IEquipment[]> => {
    return await server.db.equipments.find();
  };

  const getOneEquipment = async (id: string): Promise<IEquipment> => {
    return await server.db.equipments.findOne({ _id: id });
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
    const equipmentToDelete = await server.db.equipments.findOne({
      _id: id,
    });

    if (!equipmentToDelete) {
      throw new Error("Equipment not found");
    }

    await server.db.equipments.remove(equipmentToDelete);
  };

  return {
    createEquipment,
    getAllEquipment,
    getOneEquipment,
    updateEquipment,
    deleteEquipment,
  };
};
