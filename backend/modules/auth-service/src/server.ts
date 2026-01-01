import Fastify from "fastify";
import { authRoutes } from "./routes";
import jwt from "@fastify/jwt";
import "dotenv/config";
import { env } from "./util/env";

export const app = Fastify({ logger: true });

app.register(jwt, {
  secret: env.JWT_SECRET || "ACCESS_SECRET",
  sign: { expiresIn: env.JWT_EXPIRES_IN || "1h" },
});

app.register(authRoutes);

const start = async () => {
  try {
    await app.listen({ port: env.PORT, host: env.HOST });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
