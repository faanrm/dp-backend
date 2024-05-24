import { DeepPartial, In } from "typeorm";
import { Operation } from "./operations.entity";
import {
  CreateOperationStrategy,
  UpdateOperationStrategy,
} from "./operation.interface";

export default function operationServices(server) {
  const createOperation = async (
    operationData: DeepPartial<Operation>
  ): Promise<Operation> => {
    const operation = new Operation();
    Object.assign(operation, operationData);
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
    await server.db.operations.save(operation);
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
  return {
    deleteOperation,
    getAllOperation,
    assignEquipmentToOperation,
    updateOperation,
    createOperation,
    assignOperationToProductPlan,
  };
}
