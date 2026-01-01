import "dotenv/config";
import { z } from "zod";

// Define and validate environment variables
const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().default(3001),

  HOST: z.string().default("127.0.0.1"),

  DATABASE_URL: z.url(),

  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),

  JWT_EXPIRES_IN: z.string().default("1h"),

  REFRESH_EXPIRES_IN: z.string().default("7d"),

  LOG: z.preprocess(val => val === "true", z.boolean()).default(true),
});

// Parse & validate
const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
