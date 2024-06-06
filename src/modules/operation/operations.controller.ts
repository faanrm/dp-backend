import operationServices from "./operations.services";
import { Operation } from "./operations.entity";
import { FastifyRequest, FastifyReply } from "fastify";
export default async function operationHandler(server) {
  const serv = operationServices(server);
  server.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const operations = await serv.getAllOperation();
      return reply.code(200).send(operations);
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });
  server.post(
    "/",
    async (req: FastifyRequest<{ Body: Operation }>, reply: FastifyReply) => {
      try {
        const createdEquipment = await serv.createOperation(req.body);
        return reply.code(201).send({
          message: "operation created successfully",
          data: createdEquipment,
        });
      } catch (error) {
        return reply.code(500).send({ error: error.message });
      }
    }
  );
  server.put(
    "/:_id",
    async (
      req: FastifyRequest<{ Body: Operation; Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const updateOperation = await serv.updateOperation(
          req.params.id,
          req.body
        );
        return reply.code(200).send({
          message: "operation updated successfully",
          data: updateOperation,
        });
      } catch (error) {}
    }
  );
  server.delete(
    "/:_id",
    async (
      req: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const operation = await serv.deleteOperation(req.params.id);
        return reply.code(200).send({
          message: "operation deleted successfully",
          data: operation,
        });
      } catch (error) {
        return reply.code(500).send({ error: error.message });
      }
    }
  );
  server.put(
    "/:operationId/:equipmentId",
    async (
      req: FastifyRequest<{
        Params: { operationId: string; equipmentId: string };
      }>,
      reply: FastifyReply
    ) => {
      const { operationId, equipmentId } = req.params;
      try {
        const equipmentToOperation = await serv.assignEquipmentToOperation(
          operationId,
          equipmentId
        );
        return reply.code(200).send({
          message: "equipment assigned to operation",
          data: equipmentToOperation,
        });
      } catch (error) {
        return reply.code(500).send({ error: error.message });
      }
    }
  );
  server.put(
    "/equipment-operation/:operationId/:productPlanId",
    async (
      req: FastifyRequest<{
        Params: { operationId: string; productPlanId: string };
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { operationId, productPlanId } = req.params;
        try {
          const productPlanToOperation =
            await serv.assignOperationToProductPlan(operationId, productPlanId);
          return reply.code(200).send({
            message: "operation assigned to product plan",
            data: productPlanToOperation,
          });
        } catch (error) {}
      } catch (error) {}
    }
  );
  server.put(
    "/:operationId/materials-equipments",
    async (
      req: FastifyRequest<{
        Params: { operationId: string };
        Body: { materialIds: string[]; equipmentIds: string[] };
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { materialIds, equipmentIds } = req.body;
        await serv.assignMaterialsAndEquipmentToOperation(
          req.params.operationId,
          materialIds,
          equipmentIds
        );
        reply.status(200).send({
          message: "Materials and equipments assigned to operation",
        });
      } catch (error) {
        reply.status(500).send({ error: error.message });
      }
    }
  );
}
