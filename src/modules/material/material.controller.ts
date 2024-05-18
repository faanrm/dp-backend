import { FastifyRequest, FastifyReply } from "fastify";
import { materialServices } from "./material.services";
import { IMaterial } from "./material.interface";
export default async function materialHandler(server) {
  const serv = materialServices(server);
  server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const materials = await serv.getAllMaterial();
      return reply.code(200).send(materials);
    } catch (error) {
      return reply.code(500).send({ message: "Internal Servor error" });
    }
  });
  server.put(
    "/:id",
    async (
      request: FastifyRequest<{ Params: IMaterial; Body: IMaterial }>,
      reply: FastifyReply
    ) => {
      try {
        const material = serv.updateMaterial(request.params._id, request.body);
        if (!material) {
          return reply.code(400).send({ message: "material not found" });
        }
        return reply
          .code(200)
          .send({ message: "material updated successfully", data: material });
      } catch (error) {
        return reply.code(500).send({ message: "Internal servor error" });
      }
    }
  );
  server.delete(
    "/:id",
    async (
      request: FastifyRequest<{ Params: IMaterial }>,
      reply: FastifyReply
    ) => {
      try {
        const material = serv.deleteMaterial(request.params._id);
        return reply
          .code(204)
          .send({ message: "material deleted", data: material });
      } catch (error) {
        return reply
          .code(500)
          .send({ message: "Internal servor error+ ", details: error.message });
      }
    }
  );
  server.post(
    "/",
    async (
      request: FastifyRequest<{ Body: IMaterial }>,
      reply: FastifyReply
    ) => {
      try {
        const material = await serv.addMaterial(request.body);
        return reply
          .code(200)
          .send({ message: "material added successfully", data: material });
      } catch (error) {
        return reply
          .code(500)
          .send({ message: "Internal servor error", details: error.message });
      }
    }
  );
}