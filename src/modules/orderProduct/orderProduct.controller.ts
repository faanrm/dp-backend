import { orderProduct } from "./orderProduct.entity";
import { IOrderProduct } from "./orderProduct.interface";
import { orderProductServices } from "./orderProduct.services";
import { FastifyRequest, FastifyReply } from "fastify";
export default async function orderProduchHandler(server) {
  const serv = orderProductServices(server);
  server.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const orderProducts = await serv.getAllorderProduct();
      return reply.code(200).send(orderProducts);
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });
  server.post(
    "/",
    async (
      req: FastifyRequest<{
        Body: { productId: string; orderQuantity: number };
      }>,
      reply: FastifyReply
    ): Promise<void> => {
      try {
        const { productId, orderQuantity } = req.body;
        const product = await server.db.products.findOne(productId);
        if (!product) {
          return reply.code(404).send({ message: "Product not found" });
        }

        if (product.quantity < orderQuantity) {
          return reply.code(400).send({
            message: "Not enough quantity available for this product",
          });
        }

        const newOrderProduct = await serv.createOrderProduct(
          product,
          orderQuantity
        );

        return reply.code(201).send({
          message: "Order product created",
          data: newOrderProduct,
        });
      } catch (error) {
        return reply.code(500).send({ message: error.message });
      }
    }
  );

  server.put(
    "/:_id",
    async (
      req: FastifyRequest<{ Body: IOrderProduct; Params: { id: string } }>,
      reply: FastifyReply
    ): Promise<void> => {
      const orderProductId = req.params.id;
      try {
        const updatedProduct = await serv.updateOrderProduct(
          orderProductId,
          req.body
        );
        return reply.code(200).send({
          message: "Order product updated",
          data: updatedProduct,
        });
      } catch (error) {
        return reply.code(500).send({ message: error.message });
      }
    }
  );
  server.delete(
    "/:_id",
    async (
      req: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ): Promise<void> => {
      const orderProductId = req.params.id;
      try {
        const deletedProduct = await serv.deleteProduct(orderProductId);
        return reply.code(204).send({
          message: "Order product deleted",
          data: deletedProduct,
        });
      } catch (error) {
        return reply.code(500).send({ message: error.message });
      }
    }
  );
}
