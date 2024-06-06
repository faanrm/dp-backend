import { In } from "typeorm";
import { Operation } from "./operations.entity";
export enum OperationState {
  finish,
  in_progress,
  cancelled,
}
export interface OperationStrategy {
  execute(operation: Operation): Promise<void>;
}

class CreateOperationStrategy implements OperationStrategy {
  private server;

  constructor(server) {
    this.server = server;
  }

  async execute(operation: Operation): Promise<void> {
    const createdOperation = new Operation().clone();
    createdOperation.duration = operation.duration as Date;
    createdOperation.state = operation.state;

    await this.server.db.operations.save(createdOperation);

    if (operation.materialO) {
      const materialIds = operation.materialO.map((mat) => mat._id);
      const material = await this.server.db.materials.find({
        where: { _id: In(materialIds) },
      });
      if (material.length !== materialIds.length) {
        throw new Error("Some material not found");
      }
      createdOperation.materialO = material;
    }
    if (operation.equipmentO) {
      const equipmentIds = operation.equipmentO.map((eq) => eq._id);
      const equipment = await this.server.db.equipments.find({
        where: { _id: In(equipmentIds) },
      });
      if (equipment.length !== equipmentIds.length) {
        throw new Error("Some equipment not found");
      }
      createdOperation.equipmentO = equipment;
    }

    await this.server.db.operations.save(createdOperation);
  }
}

class UpdateOperationStrategy implements OperationStrategy {
  private server;

  constructor(server) {
    this.server = server;
  }
  async execute(operation: Operation): Promise<void> {
    const op = await this.server.db.operations.findOne({ _id: operation._id });
    if (!op) {
      throw new Error("Operation not found");
    }
    Object.assign(op, operation);
    if (operation.equipmentO) {
      const equipmentIds = operation.equipmentO.map((eq) => eq._id);
      const equipment = await this.server.db.equipments.find({
        where: { _id: In(equipmentIds) },
      });
      if (equipment.length !== equipmentIds.length) {
        throw new Error("Some equipment not found");
      }
      op.equipmentO = equipment;
    }
    if (operation.materialO) {
      const materialIds = operation.materialO.map((mat) => mat._id);
      const material = await this.server.db.materials.find({
        where: { _id: In(materialIds) },
      });
      if (material.length !== materialIds.length) {
        throw new Error("Some material not found");
      }
      op.materialO = material;
    }
    await this.server.db.operations.save(op);
  }
}

export { CreateOperationStrategy, UpdateOperationStrategy };
