// routes.ts
import { FastifyInstance } from "fastify";
import { NovoCliente } from "../@types/typesClientes";
import { UseCaseCliente } from "../usecases/UseCaseCliente";
import {
  createClienteSchema,
  createClienteResponseSchema,
  getAllClientesResponseSchema,
  getClienteResponseSchema,
} from "../schemas/clienteSchema";

export async function clienteRoute(app: FastifyInstance) {
  const useCaseCliente = new UseCaseCliente();

  app.post<{ Body: NovoCliente }>(
    "/",
    {
      schema: {
        tags: ["Cliente"],
        description: "Cria um novo cliente",
        body: createClienteSchema,
        response: createClienteResponseSchema,
      },
    },
    async (request, reply) => {
      const useCaseCliente = new UseCaseCliente();

      try {
        const { nome, telefone } = request.body;
        const cliente = await useCaseCliente.create({ nome, telefone });
        return reply.status(201).send(cliente);
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: error });
      }
    }
  );

  app.get(
    "/",
    {
      schema: {
        tags: ["Cliente"],
        description: "Listar todos os clientes",
        response: getAllClientesResponseSchema,
      },
    },
    async () => {
      return await useCaseCliente.findAll();
    }
  );

  app.get<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        tags: ["Cliente"],
        description: "Buscar cliente por ID",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        response: getClienteResponseSchema,
      },
    },
    async (req, res) => {
      const { id } = req.params;
      const cliente = await useCaseCliente.findById(id);
      if (!cliente)
        return res.status(404).send({ mensagem: "Cliente não encontrado" });
      return cliente;
    }
  );
}
