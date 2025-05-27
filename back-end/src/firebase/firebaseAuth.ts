// firebase/firebaseAuth.ts
import { FastifyRequest, FastifyReply } from "fastify";
import admin from "firebase-admin";

// inicialize o Firebase Admin se ainda não estiver feito em outro lugar
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // ou use serviceAccount
  });
}

export async function verifyFirebaseToken(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.status(401).send({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    (request as any).user = decoded; // você pode tipar melhor isso depois
  } catch (error) {
    return reply.status(403).send({ message: "Token inválido" });
  }
}
