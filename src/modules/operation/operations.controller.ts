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
    "/:id",
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
    "/:id",
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
}
