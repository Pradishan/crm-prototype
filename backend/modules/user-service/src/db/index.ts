import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { relations } from "./relations";
import { env } from "../util/env";

const pool = new Pool({
  connectionString: env.DATABASE_URL || "password",
});

export const db = drizzle({ client: pool, relations, schema });