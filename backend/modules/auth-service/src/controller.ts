import type { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { app } from "./server";
import type { LoginPayload, RegisterPayload } from "./util/types";

export const loginHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { email, password } = req.body as LoginPayload;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) return reply.code(401).send({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return reply.code(401).send({ message: "Invalid credentials" });

  const accessToken = app.jwt.sign({
    sub: user.id,
    role: user.roleId,
  });

  return { accessToken };
};

export const RegisterHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { email, password, confirmPassword } = req.body as RegisterPayload;

  if (password !== confirmPassword) {
    return reply.code(400).send({ message: "Passwords do not match" });
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  
  if (existingUser) {
    return reply.code(409).send({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
      roleId: 2, // default role
    })
    .returning();

  return reply.code(201).send(newUser);
};
