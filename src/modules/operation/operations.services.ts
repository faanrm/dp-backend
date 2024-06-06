import { DeepPartial, In } from "typeorm";
import { Operation } from "./operations.entity";
import {
  CreateOperationStrategy,
  UpdateOperationStrategy,
} from "./operation.interface";
import { EquipmentUsage } from "../equipmentUsage/equipment.usage.entity";
import { OperationState } from "./operation.interface";

export default function operationServices(server) {
  const createOperation = async (
    operationData: DeepPartial<Operation>
  ): Promise<Operation> => {
    const operation = new Operation();
    Object.assign(operation, operationData);
    await server.db.operations.create(operation);
    await server.db.operations.save(operation);

    const strategy = new CreateOperationStrategy(server);
    await strategy.execute(operation);

    return operation;
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

    const strategy = new UpdateOperationStrategy(server);
    await strategy.execute(operation);

    return operation;
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
  const assignEquipmentToOperation = async (
    operationId: string,
    equipmentId: string
  ): Promise<void> => {
    const operation = await server.db.operations.findOne({ _id: operationId });
    if (!operation) {
      throw new Error("Operation not found");
    }
    const equipment = await server.db.equipments.findOne({ _id: equipmentId });
    if (!equipment) {
      throw new Error("Equipment not found");
    }
    operation.setEquipment(equipment);
    const equipmentUsage = new EquipmentUsage();
    equipmentUsage.equipment = equipment;
    equipmentUsage.operation = operation;
    equipmentUsage.startTime = new Date();
    await server.db.operations.save(operation);
    await server.db.equipmentUsages.save(equipmentUsage);
    return operation;
  };
  const assignOperationToProductPlan = async (
    operationId: string,
    productPlanId: string
  ): Promise<void> => {
    const operation = await server.db.operations.findOne({ _id: operationId });
    if (!operation) {
      throw new Error("Operation not found");
    }
    const productPlan = await server.db.productPlans.findOne({
      _id: productPlanId,
    });
    if (!productPlan) {
      throw new Error("Product plan not found");
    }
    operation.productPlan = productPlan;
    await server.db.operations.save(operation);
  };
  const makeOperationFinish = async (
    operationId: string,
    equipmentId: string,
    newState: string
  ): Promise<Operation> => {
    const operation = await server.db.operations.findOne({ _id: operationId });
    if (!operation) {
      throw new Error("Operation not found");
    }
    if (!(newState in OperationState)) {
      throw new Error("state invalid");
    }
    const equipment = await server.db.equipments.findOne({ _id: equipmentId });
    if (!equipment) {
      throw new Error("Equipment not found");
    }
    operation.state = OperationState.finish;
    equipment.lifePoint = equipment.lifePoint - 1;
    await server.db.equipments.save(equipment);
    await server.db.operations.save(operation);

    return operation;
  };
  async function assignMaterialsAndEquipmentToOperation(
    operationId: string,
    materialIds: string[],
    equipmentIds: string[]
  ) {
    // Find the operation
    const operation = await server.db.operations.findOne({
      where: { _id: operationId },
    });
    if (!operation) {
      throw new Error("Operation not found");
    }

    const materials = await server.db.materials.findByIds(materialIds);
    if (materials.length !== materialIds.length) {
      throw new Error("Some materials not found");
    }
    operation.materialO = materials;

    const equipments = await server.db.equipments.findByIds(equipmentIds);
    if (equipments.length !== equipmentIds.length) {
      throw new Error("Some equipments not found");
    }
    operation.equipmentO = equipments;

    await server.db.operations.save(operation);
  }
  return {
    makeOperationFinish,
    deleteOperation,
    getAllOperation,
    assignEquipmentToOperation,
    updateOperation,
    createOperation,
    assignOperationToProductPlan,
    assignMaterialsAndEquipmentToOperation,
  };
}
