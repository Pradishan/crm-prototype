import { builder } from "./builder";
import { db } from "../db";
import { eq } from "drizzle-orm";

builder.queryType({
  fields: (t) => ({
    user: t.drizzleField({
      type: "users",
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (query, _root, args, _ctx) => {
        return await db.query.users.findFirst(
          query({
            where:{
              id: Number.parseInt(args.id, 10)
            },
          })
        );
      },
    }),
    users: t.drizzleField({
      type: ["users"],
      resolve: async (query, _root, _args, _ctx) => {
        return await db.query.users.findMany(query());
      },
    }),
    roles: t.drizzleField({
      type: ["roles"],
      resolve: async (query, _root, _args, _ctx) => {
        return await db.query.roles.findMany(query());
      },
    }),
  }),
});
