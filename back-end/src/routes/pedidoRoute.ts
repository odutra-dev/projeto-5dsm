// pedidoRoute.ts
import { FastifyInstance } from "fastify";
import { UseCasePedido } from "../usecases/UseCasePedido";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { NovoPedido } from "../@types/typesPedidos";
import {
  createPedidoResponseSchema,
  createPedidoSchema,
  getAllPedidosResponseSchema,
  getPedidosResponseSchema,
} from "../schemas/pedidoSchema";

export async function pedidoRoute(app: FastifyInstance) {
  const useCasePedido = new UseCasePedido();
  const clienteRepository = new ClienteRepository();

  app.post<{ Body: NovoPedido }>("/", {
    schema: {
      tags: ["Pedido"],
      description: "Cria um novo pedido com produtos",
      body: createPedidoSchema,
      response: createPedidoResponseSchema,
    },

    handler: async (request, reply) => {
      const {
        data,
        horario,
        tipo_entrega,
        tipo_pagamento,
        clienteId,
        produtos,
        status,
        valor,
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
          produtos, // apenas com produtoId e quantidade
          status,
          valor,
        });

        // Cria subdocumento dentro do cliente
        await clienteRepository.addPedidoSubdocument(clienteId, {
          pedidoId: pedido.id,
          data,
          horario,
          tipo_entrega,
          tipo_pagamento,
          produtos,
          status,
          valor,
        });

        return reply.status(201).send(pedido);
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Erro ao criar pedido" });
      }
    },
  });

  // GET - Listar todos os pedidos
  app.get("/", {
    schema: {
      tags: ["Pedido"],
      description: "Listar todos os pedidos",
      response: getAllPedidosResponseSchema,
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
      response: getPedidosResponseSchema,
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

  // PUT - Atualizar status do pedido
  app.put<{ Params: { id: string }; Body: { status: string } }>("/:id", {
  schema: {
    tags: ["Pedido"],
    description: "Atualiza o status de um pedido pelo ID",
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
    body: {
      type: "object",
      properties: {
        status: { type: "string" },
      },
      required: ["status"],
    },
    response: {
      200: {
        description: "Pedido atualizado com sucesso",
        type: "object",
        properties: {
          mensagem: { type: "string" },
        },
      },
      404: {
        description: "Pedido não encontrado",
        type: "object",
        properties: {
          mensagem: { type: "string" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    const { id } = request.params;
    const { status } = request.body;

    const pedidoExiste = await useCasePedido.findById(id);
    if (!pedidoExiste) {
      return reply.status(404).send({ mensagem: "Pedido não encontrado" });
    }

    await useCasePedido.updateStatus(id, status);

    return reply.send({ mensagem: "Status do pedido atualizado com sucesso" });
  },
  });

}
