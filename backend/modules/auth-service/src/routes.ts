import type { FastifyInstance } from "fastify";
import { loginHandler, RegisterHandler } from "./controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", loginHandler);
  app.post("/register", RegisterHandler);
}
