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
        return reply
          .status(500)
          .send({ message: "Erro ao criar administrador" });
      }
    }
  );

  app.post<{ Body: { email: string; senha: string } }>(
    "/login",
    {
      schema: {
        tags: ["Administrador"],
        description: "Login do administrador",
        body: {
          type: "object",
          properties: {
            email: { type: "string" },
            senha: { type: "string" },
          },
          required: ["email", "senha"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              token: { type: "string" },
              nome: { type: "string" },
            },
          },
          401: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { email, senha } = req.body;

      try {
        const result = await useCaseAdmin.login(email, senha);
        return reply.send(result);
      } catch (err) {
        return reply.status(401).send({ message: "Email ou senha incorretos" });
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
        return res
          .status(404)
          .send({ mensagem: "Administrador não encontrado" });
      }
      return admin;
    }
  );
}
