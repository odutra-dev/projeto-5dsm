// routes.ts
import { FastifyInstance } from "fastify";
import {
  createAdminSchema,
  createAdminResponseSchema,
  getAllAdminsResponseSchema,
  getAdminResponseSchema,
} from "../schemas/adminSchema";
import { UseCaseAdmin } from "../usecases/UseCaseAdmin";
import { NovoAdmin } from "../@types/typesAdmin";
import { verifyFirebaseToken } from "../firebase/firebaseAuth";
import crypto from "crypto";

export async function adminRoute(app: FastifyInstance) {
  const useCaseAdmin = new UseCaseAdmin();
  const algorithm = "aes-256-gcm";
  const key = crypto.scryptSync(process.env.AES_SECRET || "minha-chave-secreta", "salt", 32);

  function encrypt(text: string): string {
    const iv = crypto.randomBytes(12); // GCM recomenda IV de 12 bytes
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag().toString("hex");
    return `${iv.toString("hex")}:${authTag}:${encrypted}`;
  }

  app.post<{ Body: NovoAdmin }>(
    "/",
    {
      schema: {
        tags: ["Administrador"],
        description: "Cria um novo administrador",
        body: createAdminSchema,
        response: createAdminResponseSchema,
      },
    },
    async (request, reply) => {
      try {
        const { nome, email, senha } = request.body;
        const senhaCriptografada = encrypt(senha);
        const admin = await useCaseAdmin.create({ nome, email, senha: senhaCriptografada });
        return reply.status(201).send(admin);
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: error });
      }
    }
  );

  app.get(
    "/",
    {
      schema: {
        tags: ["Administrador"],
        description: "Listar todos os administradores",
        response: getAllAdminsResponseSchema,
      },
    },
    async () => {
      return await useCaseAdmin.findAll();
    }
  );

  app.get<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        tags: ["Administrador"],
        description: "Buscar Administrador por ID",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        response: getAdminResponseSchema,
      },
    },
    async (req, res) => {
      const { id } = req.params;
      const admin = await useCaseAdmin.findById(id);
      if (!admin) {
        return res.status(404).send({ mensagem: "Administrador não encontrado" });
      }
      return admin;
    }
  );
}
