import { builder } from "./builder";
import { db } from "../db";
import { users, roles } from "../db/schema";
import { eq } from "drizzle-orm";
import { UpdateUserInput } from "./user.type";

// Define mutations
builder.mutationType({
  fields: (t) => ({
    updateUser: t.drizzleField({
      type: "users",
      nullable: true,
      args: {
        input: t.arg({ type: UpdateUserInput, required: true }),
      },
      resolve: async (query, _root, args, _ctx) => {
        const userId = Number.parseInt(args.input.id, 10);

        const updateData: any = {};
        if (args.input.email) updateData.email = args.input.email;
        if (args.input.roleId) updateData.roleId = args.input.roleId;

        await db.update(users).set(updateData).where(eq(users.id, userId));

        return await db.query.users.findFirst(
          query({
            where: {
              id: userId,
            },
          })
        );
      },
    }),
    deleteUser: t.field({
      type: "Boolean",
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (_root, args, _ctx) => {
        const userId = Number.parseInt(args.id, 10);

        await db.delete(users).where(eq(users.id, userId));

        return true;
      },
    }),
  }),
});
