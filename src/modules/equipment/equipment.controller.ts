import { FastifyReply, FastifyRequest } from "fastify";
import { IEquipment } from "./equipment.interface";
import { equipmentService } from "./equipment.service";
import { Equipment } from "./equipment.entity";
export default async function equipmentController(server) {
  const serv = equipmentService(server);

  server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const equipments = await serv.getAllEquipment();
      reply.code(200).send(equipments);
    } catch (error) {
      console.error(error);
      reply.code(500).send({
        error: "An error occurred while retrieving equipment data",
        details: error.message,
      });
    }
  });

  server.get(
    "/:id",
    async (
      request: FastifyRequest<{ Params: IEquipment }>,
      reply: FastifyReply
    ) => {
      try {
        const id = request.params._id;
        const equipment = await serv.getOneEquipment(id);
        reply.code(200).send(equipment);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );
  server.delete(
    "/:id",
    async (
      request: FastifyRequest<{ Params: IEquipment }>,
      reply: FastifyReply
    ) => {
      try {
        const id = request.params._id;
        const equipment = await serv.deleteEquipment(id);
        return reply
          .code(200)
          .send({ message: "Equipment deleted", data: equipment });
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  server.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const newEquipment = await serv.createEquipment(request.body);
      reply.code(201).send(newEquipment);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  server.put(
    "/:id",
    async (
      request: FastifyRequest<{ Params: IEquipment }>,
      reply: FastifyReply
    ) => {
      try {
        const id = request.params._id;
        const updatedEquipment = await serv.updateEquipment(id, request.body);
        reply.code(200).send(updatedEquipment);
      } catch (error) {
        console.error(error);
        reply.code(500).send({ error: error.message });
      }
    }
  );
  server.get(
    "/history/:id",
    async (
      request: FastifyRequest<{ Params: IEquipment }>,
      reply: FastifyReply
    ) => {
      try {
        const id = request.params._id;
        const history = await serv.getMaintenanceHistory(id);
        reply.code(200).send(history);
      } catch (error) {
        reply
          .code(500)
          .send({ message: "Error when getting history maintenance" });
      }
    }
  );
}
