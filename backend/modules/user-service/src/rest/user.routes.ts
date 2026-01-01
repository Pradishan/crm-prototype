import type { FastifyInstance } from "fastify";
import { userDeleteHandler, userUpdateHandler } from "./user.controller";
import type { userParamsType } from "../util/types";

export async function userRoutes(app: FastifyInstance) {
  app.post<{ Params: userParamsType }>("/update-user/:id", userUpdateHandler);
  app.post<{ Params: userParamsType }>("/delete-user/:id", userDeleteHandler);
}
