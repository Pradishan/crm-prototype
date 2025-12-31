import { buildApp } from "./app";
import { env } from "./env";

const start = async () => {
  try {
    await buildApp().listen({ port: env.PORT, host: env.HOST });
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

start();
