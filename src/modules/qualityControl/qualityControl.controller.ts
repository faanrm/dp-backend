import { FastifyReply, FastifyRequest } from "fastify";
import { qualityControlServices } from "./qualityControl.services";
import { QualityControl } from "./qualityControl.entity";

export default async function qualityControlController(server) {
  const serv = qualityControlServices(server);
  server.put(
    "/productId",
    async (
      req: FastifyRequest<{
        Params: { productId: string; Body: QualityControl };
      }>,
      reply: FastifyReply
    ) => {
      try {
        const control = (await serv).controlProduct(
          req.params.productId,
          req.body
        );
        return reply
          .code(201)
          .send({ message: "Control added ", data: control });
      } catch (error) {
        reply.code(500).send({ message: error.message });
      }
    }
  );
}
