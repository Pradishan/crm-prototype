import type { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";

export const userUpdateHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = Number.parseInt(req.params?.id, 10);
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };
  const updateData: any = {};
  if (email) updateData.email = email;
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }
  console.log(userId);
  await db.update(users).set(updateData).where(eq(users.id, userId));
  const updatedUser = await db.query.users.findFirst({
    where: { id: userId },
  });

  return reply.send(updatedUser);
};

export const userDeleteHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = Number.parseInt(req.params?.id, 10);

  try {
    const result = await db.delete(users).where(eq(users.id, userId));

    const rowsDeleted = result.rowCount ?? result;

    if (rowsDeleted === 0) {
      return reply.code(404).send({ message: "User not found" });
    }

    return reply.code(200).send({ message: "User deleted successfully" });
  } catch (err) {
    return reply
      .code(500)
      .send({ message: "User deletion failed", error: err?.message });
  }
};
