import "dotenv/config";
import { z } from "zod";

// Define and validate environment variables
const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().default(3000),

  HOST: z.string().default("127.0.0.1"),

  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),

  JWT_EXPIRES_IN: z.string().default("1h"),

  LOG: z.coerce.boolean().default(true),

  //   service urls

  AUTH_SERVICE_URL: z.string().url().default("http://localhost:3001"),
  USER_SERVICE_URL: z.string().url().default("http://localhost:3002"),
});

// Parse & validate
const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
