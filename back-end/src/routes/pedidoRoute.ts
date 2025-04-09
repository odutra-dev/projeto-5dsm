// routes.ts
import { FastifyInstance } from "fastify";
import { UseCasePedido } from "../usecases/UseCasePedido";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { NovoPedido } from "../@types/typesPedidos";

export async function pedidoRoute(app: FastifyInstance) {
  const useCasePedido = new UseCasePedido();

  app.post<{ Body: NovoPedido }>(
    "/",
    {
      schema: {
        tags: ["Pedido"],
        description: "Cria um novo pedido",
        body: {
          type: "object",
          properties: {
            data: {
              type: "string",
              format: "date", // apenas data (ex: 2025-04-09)
              minLength: 3,
              maxLength: 100,
            },
            horario: {
              type: "string",
              format: "date-time", // inclui hora (ex: 2025-04-09T12:30:00Z)
              minLength: 3,
              maxLength: 255,
            },
            tipo_entrega: {
              type: "string",
              minLength: 3,
              maxLength: 255,
            },
            tipo_pagamento: {
              type: "string",
              minLength: 3,
              maxLength: 255,
            },
            clienteId: {
              type: "string",
              minLength: 1,
            },
          },
          required: ["data", "horario", "tipo_entrega", "tipo_pagamento", "clienteId"],
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "string" },
              data: { type: "string", format: "date" },
              horario: { type: "string", format: "date-time" },
              tipo_entrega: { type: "string" },
              tipo_pagamento: { type: "string" },
              clienteId: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const clienteRepository = new ClienteRepository();

      try {
        const { data, horario, tipo_entrega, tipo_pagamento, clienteId } = request.body;

        const clienteExiste = await clienteRepository.findById(clienteId);
        if (!clienteExiste) {
          return reply.status(404).send({ mensagem: "Cliente não encontrado" });
        }

        const pedido = await useCasePedido.create({
          data,
          horario,
          tipo_entrega,
          tipo_pagamento,
          clienteId,
        });

        await clienteRepository.updatePedido(clienteId, {
          data,
          horario,
          tipo_entrega,
          tipo_pagamento,
        });

        return reply.status(201).send(pedido);
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: error });
      }
    }
  );

  // GET - Listar todos os pedidos
  app.get("/", {
    schema: {
      tags: ["Pedido"],
      description: "Listar todos os pedidos",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              data: { type: "string", format: "date" },
              horario: { type: "string", format: "date-time" },
              tipo_entrega: { type: "string" },
              tipo_pagamento: { type: "string" },
              clienteId: { type: "string" },
            },
          },
        },
      },
    },
  }, async () => {
    return await useCasePedido.findAll();
  });

  // GET - Buscar pedido por ID
  app.get<{ Params: { id: string } }>("/:id", {
    schema: {
      tags: ["Pedido"],
      description: "Buscar pedido por ID",
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            data: { type: "string", format: "date" },
            horario: { type: "string", format: "date-time" },
            tipo_entrega: { type: "string" },
            tipo_pagamento: { type: "string" },
            clienteId: { type: "string" },
          },
        },
        404: {
          type: "object",
          properties: {
            mensagem: { type: "string" },
          },
        },
      },
    },
  }, async (req, res) => {
    const { id } = req.params;
    const pedido = await useCasePedido.findById(id);
    if (!pedido) {
      return res.status(404).send({ mensagem: "Pedido não encontrado" });
    }
    return pedido;
  });
}
