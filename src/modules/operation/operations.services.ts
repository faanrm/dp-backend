import { DeepPartial } from "typeorm";
import { Operation } from "./operations.entity";
export default function operationServices(server) {
  const createOperation = async (
    operationData: DeepPartial<Operation>
  ): Promise<any> => {
    const createdOperation = new Operation().clone();
    createdOperation.duration = operationData.duration as Date;
    if (operationData.equipmentO) {
      const equipment = await server.db.equipments.findOne(
        operationData.equipmentO._id
      );
      if (equipment) {
        createdOperation.equipmentO = equipment;
      } else {
        throw new Error("Equipment not found");
      }
    }
    if (operationData.materialO) {
      const material = await server.db.materials.findOne(
        operationData.materialO._id
      );
      if (material) {
        createdOperation.materialO = material;
      } else {
        throw new Error("Material not found");
      }
    }
    return await server.db.operations.save(createdOperation);
  };
  const updateOperation = async (
    id: string,
    operationData: DeepPartial<Operation>
  ): Promise<Operation> => {
    const operation = await server.db.operations.findOne({ _id: id });
    if (!operation) {
      throw new Error("Operation not found");
    }
    Object.assign(operation, operationData);
    if (operationData.equipmentO) {
      const equipment = await server.db.equipments.findOne(
        operationData.equipmentO._id
      );
      if (!equipment) {
        throw new Error("Equipment not found");
      }
      operation.setEquipment(equipment);
    }
    if (operationData.materialO) {
      const material = await server.db.Material.findOne(
        operationData.materialO._id
      );
      if (!material) {
        throw new Error("Material not found");
      }
      operation.setMaterial(material);
    }
    return await server.db.operations.save(operation);
  };
  const getAllOperation = async (): Promise<Operation[]> => {
    return await server.db.operations.find();
  };
  const deleteOperation = async (id: string): Promise<void> => {
    const operation = await server.db.operations.delete(id);
    if (!operation) {
      throw new Error("Operation not found");
    }
    return operation;
  };
  return {
    deleteOperation,
    getAllOperation,
    updateOperation,
    createOperation,
  };
}
