import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IEquipment } from "./equipment.interface";
import { equipmentService } from "./equipment.service";
export default async function equipmentController(
  route: FastifyInstance,
  server
) {
  const serv = equipmentService(server);

  route.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
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

  route.get(
    "/:id",
    async (
      request: FastifyRequest<{ Params: IEquipment }>,
      reply: FastifyReply
    ) => {
      try {
        const equipment = await serv.getOneEquipment(request.params._id);
        reply.code(200).send(equipment);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  route.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const newEquipment = await serv.createEquipment(request.body);
      reply.code(201).send(newEquipment);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  route.put(
    "/:id",
    async (
      request: FastifyRequest<{ Params: IEquipment }>,
      reply: FastifyReply
    ) => {
      try {
        const updatedEquipment = await serv.updateEquipment(
          request.params._id,
          request.body
        );
        reply.code(200).send(updatedEquipment);
      } catch (error) {
        console.error(error);
        reply.code(500).send({ error: error.message });
      }
    }
  );

  route.delete(
    "/:id",
    async (
      request: FastifyRequest<{ Params: IEquipment }>,
      reply: FastifyReply
    ) => {
      try {
        await serv.deleteEquipment(request.params._id);
        reply.code(204).send();
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );
}
