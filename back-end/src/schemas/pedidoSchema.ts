export const createPedidoSchema = {
  type: "object",
  properties: {
    data: { type: "string", format: "date" },
    horario: { type: "string", format: "date-time" },
    tipo_entrega: { type: "string", minLength: 3, maxLength: 255 },
    tipo_pagamento: { type: "string", minLength: 3, maxLength: 255 },
    clienteId: { type: "string", minLength: 1 },
    status: { type: "string", enum: ["PENDENTE", "CONFIRMADO", "ENTREGUE"] },
    valor: { type: "number", minimum: 0 },
    produtos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          produtoId: { type: "string" },
          quantidade: { type: "number", minimum: 1 },
        },
        required: ["produtoId", "quantidade"],
      },
      minItems: 1,
    },
  },
  required: [
    "data",
    "horario",
    "tipo_entrega",
    "tipo_pagamento",
    "clienteId",
    "produtos",
    "status",
    "valor",
  ],
};

export const createPedidoResponseSchema = {
  201: {
    type: "object",
    properties: {
      id: { type: "string" },
      data: { type: "string", format: "date" },
      horario: { type: "string", format: "date-time" },
      tipo_entrega: { type: "string" },
      tipo_pagamento: { type: "string" },
      clienteId: { type: "string" },
      status: { type: "string" },
      valor: { type: "number" },
      produtos: {
        type: "array",
        items: {
          type: "object",
          properties: {
            produtoId: { type: "string" },
            quantidade: { type: "number" },
          },
        },
      },
    },
  },
};

export const getAllPedidosResponseSchema = {
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
        status: { type: "string" },
        valor: { type: "number" },
      },
    },
  },
};

export const getPedidosResponseSchema = {
  200: {
    type: "object",
    properties: {
      id: { type: "string" },
      data: { type: "string", format: "date" },
      horario: { type: "string", format: "date-time" },
      tipo_entrega: { type: "string" },
      tipo_pagamento: { type: "string" },
      clienteId: { type: "string" },
      status: { type: "string" },
      valor: { type: "number" },
    },
  },
  404: {
    type: "object",
    properties: {
      mensagem: { type: "string" },
    },
  },
};
