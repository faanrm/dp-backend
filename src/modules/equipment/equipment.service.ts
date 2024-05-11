import { DeepPartial } from "typeorm";
import { Equipment } from "./equipment.entity";
import { IEquipment, EType, IState } from "./equipment.interface";
import { IProduct } from "../products/products.interface";
export const equipmentService = (server) => {
  const createEquipment = async (
    equipmentData: DeepPartial<IEquipment>
  ): Promise<IEquipment> => {
    const createdEquipment = new Equipment().clone();
    Object.assign(createdEquipment, equipmentData);
    return await server.db.equipments.save(createdEquipment);
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
  const changeEquipmentState = async (
    id: string,
    newState: IState
  ): Promise<IEquipment> => {
    const equipmentToUpdate = await server.db.equipments.findOne({ _id: id });

    if (!equipmentToUpdate) {
      throw new Error("Equipment not found");
    }

    equipmentToUpdate.state = newState;
    return await server.db.equipments.save(equipmentToUpdate);
  };
  return {
    changeEquipmentState,
    createEquipment,
    getAllEquipment,
    getOneEquipment,
    updateEquipment,
  };
};
