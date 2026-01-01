import { builder } from "./builder";

// Define the User object type with fields
export const RoleRef = builder.drizzleObject("roles", {
  name: "Role",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    permissions: t.string({
      resolve: (role) => JSON.stringify(role.permissions),
    }),
    createdAt: t.expose("createdAt", { type: "String" }),
    updatedAt: t.expose("updatedAt", { type: "String" }),
  }),
});

// Define the User object type with fields
export const UserRef = builder.drizzleObject("users", {
  name: "User",
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    roleId: t.exposeID("roleId"),
    role: t.relation("role",{type: RoleRef}),
    createdAt: t.expose("createdAt", { type: "String" }),
    updatedAt: t.expose("updatedAt", { type: "String" }),
  }),
});

// Define input types
export const UpdateUserInput = builder.inputType("UpdateUserInput", {
  fields: (t) => ({
    id: t.id({ required: true }),
    email: t.string(),
    roleId: t.id(),
  }),
});
