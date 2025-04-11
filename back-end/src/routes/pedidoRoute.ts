// pedidoRoute.ts
import { FastifyInstance } from "fastify";
import { UseCasePedido } from "../usecases/UseCasePedido";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { NovoPedido } from "../@types/typesPedidos";

export async function pedidoRoute(app: FastifyInstance) {
  const useCasePedido = new UseCasePedido();
  const clienteRepository = new ClienteRepository();

  app.post<{ Body: NovoPedido }>("/", {
    schema: {
      tags: ["Pedido"],
      description: "Cria um novo pedido com produtos",
      body: {
        type: "object",
        properties: {
          data: { type: "string", format: "date" },
          horario: { type: "string", format: "date-time" },
          tipo_entrega: { type: "string", minLength: 3, maxLength: 255 },
          tipo_pagamento: { type: "string", minLength: 3, maxLength: 255 },
          clienteId: { type: "string", minLength: 1 },
          produtos: {
            type: "array",
            items: {
              type: "object",
              properties: {
                produtoId: { type: "string" },
                quantidade: { type: "number", minimum: 1 }
              },
              required: ["produtoId", "quantidade"]
            },
            minItems: 1
          }
        },
        required: [
          "data",
          "horario",
          "tipo_entrega",
          "tipo_pagamento",
          "clienteId",
          "produtos"
        ]
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
            produtos: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  produtoId: { type: "string" },
                  quantidade: { type: "number" }
                }
              }
            }
          }
        }
      }
    },
  
    handler: async (request, reply) => {
      const {
        data,
        horario,
        tipo_entrega,
        tipo_pagamento,
        clienteId,
        produtos
      } = request.body;
  
      const clienteExiste = await clienteRepository.findById(clienteId);
      if (!clienteExiste) {
        return reply.status(404).send({ mensagem: "Cliente não encontrado" });
      }
  
      try {
        // Cria o pedido no banco principal
        const pedido = await useCasePedido.create({
          data,
          horario,
          tipo_entrega,
          tipo_pagamento,
          clienteId,
          produtos // apenas com produtoId e quantidade
        });
  
        // Cria subdocumento dentro do cliente
        await clienteRepository.addPedidoSubdocument(clienteId, {
          pedidoId: pedido.id,
          data,
          horario,
          tipo_entrega,
          tipo_pagamento,
          produtos
        });
  
        return reply.status(201).send(pedido);
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Erro ao criar pedido" });
      }
    }
  });
  

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
    handler: async () => {
      return await useCasePedido.findAll();
    },
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
    handler: async (req, res) => {
      const { id } = req.params;
      const pedido = await useCasePedido.findById(id);
      if (!pedido) {
        return res.status(404).send({ mensagem: "Pedido não encontrado" });
      }
      return pedido;
    },
  });
}
