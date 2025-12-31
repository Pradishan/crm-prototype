import Fastify from "fastify";
import jwt from "@fastify/jwt";
import proxy from "@fastify/http-proxy";
import type { FastifyRequest } from "fastify";
import { env } from "./env";

export const buildApp = () => {
  const app = Fastify({ logger: env.LOG });
  app.register(jwt, { secret: env.JWT_SECRET || "ABCDE123123" });

  app.addHook("onRequest", async (req: FastifyRequest) => {
    if (req.url.startsWith("/auth")) return;
    const decoded: { sub: string; role: string } = await req.jwtVerify();
    req.headers["x-user-id"] = decoded?.sub;
    req.headers["x-user-role"] = decoded?.role;
  });

  // all services

  app.register(proxy, {
    upstream: env.AUTH_SERVICE_URL || "http://localhost:3001",
    prefix: "/auth",
  });

  app.register(proxy, {
    upstream: env.USER_SERVICE_URL || "http://localhost:3002",
    prefix: "/users",
  });

  return app;
};
