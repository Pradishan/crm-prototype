import bcrypt from "bcrypt";
import { db } from "../../../auth-service/src/db/index.js";
import { users, roles } from "../../../auth-service/src/db/schema.js";

// seed roles
const [adminRole, userRole] = await db.insert(roles).values([
  {
    name: "admin",
    permissions: { canManageUsers: true, canDeletePosts: true, canViewAll: true },
  },
  {
    name: "user",
    permissions: { canCreatePosts: true, canEditOwnPosts: true },
  },
]).returning();

// seed users with roleId references
await db.insert(users).values([
  {
    email: "admin@test.com",
    password: await bcrypt.hash("password", 10),
    roleId: adminRole?.id,
  },
  {
    email: "user@test.com",
    password: await bcrypt.hash("password", 10),
    roleId: userRole?.id,
  },
]);

console.log("Roles and users seeded");
process.exit();