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

export async function adminRoute(app: FastifyInstance) {
  const useCaseAdmin = new UseCaseAdmin();

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

        // NÃO criptografa a senha aqui — já é feito no UseCaseAdmin
        const admin = await useCaseAdmin.create({ nome, email, senha });

        return reply.status(201).send(admin);
      } catch (error) {
        console.error("Erro na rota de criação de admin:", error);
        return reply.status(500).send({ message: "Erro ao criar administrador" });
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
