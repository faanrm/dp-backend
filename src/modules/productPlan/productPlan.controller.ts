import { FastifyRequest, FastifyReply } from "fastify";
import { ProductPlan } from "./productPlan.entity";
import productPlanServices from "./productPlan.service";
export default async function productPlanHandler(server) {
  const serv = productPlanServices(server);

  server.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const productPlan = await serv.getAllProductPlan();
      return reply.code(200).send(productPlan);
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });

  server.post("/", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const productPlan = await serv.createProductPlan(req.body);
      return reply.code(201).send(productPlan);
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });
}
