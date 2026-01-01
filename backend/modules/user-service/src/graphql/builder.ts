import { getTableConfig } from 'drizzle-orm/pg-core';
import SchemaBuilder from "@pothos/core";
import DrizzlePlugin from "@pothos/plugin-drizzle";
import { db } from "../db";
import * as schema from "../db/schema";

export interface GraphQLContext {
  userId?: string;
  roleId?: string;
  db: typeof db;
}

export const builder = new SchemaBuilder<{
  Context: GraphQLContext;
  DrizzleSchema: typeof schema;
}>({
  plugins: [DrizzlePlugin],
  drizzle: {
    client: db,
    getTableConfig,
  },
});