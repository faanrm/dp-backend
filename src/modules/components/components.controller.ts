import { FastifyRequest, FastifyReply } from "fastify";
import { Component } from "./components.entity";
import { componentsServices } from "./components.services";
export default async function componentsHandler(server) {
  const serv = componentsServices(server);
  server.post(
    "/",
    async (
      request: FastifyRequest<{ Body: Component }>,
      reply: FastifyReply
    ) => {
      try {
        const createdComponents = await serv.createComponents(request.body);
        return reply.code(201).send(createdComponents);
      } catch (error) {
        return reply.code(500).send({ error: error.message });
      }
    }
  );
  server.put(
    "/id",
    async (
      request: FastifyRequest<{ Body: Component; Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const updatedComponents = await serv.updateComponents(
          request.params.id,
          request.body
        );
        return reply.code(200).send(updatedComponents);
      } catch (error) {
        return reply.code(500).send({ error: error.message });
      }
    }
  );
  server.delete(
    "/id",
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const deletedComponents = await serv.deleteComponents(
          request.params.id
        );
        return reply.code(200).send(deletedComponents);
      } catch (error) {
        return reply.code(500).send({ error: error.message });
      }
    }
  );
  server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const components = await serv.getAllComponents();
      return reply.code(200).send(components);
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });
}
