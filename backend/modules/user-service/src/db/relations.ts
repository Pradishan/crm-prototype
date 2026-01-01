import * as schema from "./schema"
import { defineRelations } from "drizzle-orm"

export const relations = defineRelations(schema, (r) => ({
  users: {
    role: r.one.roles({
      from: r.users.roleId,
      to: r.roles.id,
    }),
  },
  roles: {
    users: r.many.users({
      from: r.roles.id,
      to: r.users.roleId,
    }),
  },
}));