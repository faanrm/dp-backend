import { FastifyReply, FastifyRequest } from "fastify";
import { productsService } from "./products.services";
import { IProduct } from "./products.interface";
export default async function productHandler(server) {
  const serv = productsService(server);
  server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const products = serv.getAllProducts();
      return reply.code(200).send(products);
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });
  server.get(
    "/:id",
    async (
      request: FastifyRequest<{ Params: IProduct }>,
      reply: FastifyReply
    ) => {
      try {
        const product = await serv.getProductById(request.params._id);
        if (!product) {
          return reply.code(404).send({ message: "product not found" });
        }
        return reply.code(200).send(product);
      } catch (error) {
        return reply.code(500).send({ error: error.message });
      }
    }
  );
  server.post(
    "/",
    async (
      request: FastifyRequest<{ Body: IProduct }>,
      reply: FastifyReply
    ) => {
      try {
        const product = await serv.createProduct(request.body);
        return reply.code(201).send(product);
      } catch (error) {
        return reply.code(500).send({ error: error.message });
      }
    }
  );
  server.put(
    "/:id",
    async (
      request: FastifyRequest<{ Params: IProduct; Body: IProduct }>,
      reply: FastifyReply
    ) => {
      try {
        const product = await serv.updateProduct(
          request.params._id,
          request.body
        );
        if (!product) {
          return reply.code(404).send({ message: "product not found" });
        }
        return reply.code(200).send(product);
      } catch (error) {
        return reply.code(500).send({ error: error.message });
      }
    }
  );
  server.delete(
    "/:id",
    async (
      request: FastifyRequest<{ Params: IProduct }>,
      reply: FastifyReply
    ) => {
      try {
        const product = await serv.deleteProduct(request.params._id);
        return reply.code(200).send(product);
      } catch (error) {
        return reply.code(500).send({ error: error.message });
      }
    }
  );
}
