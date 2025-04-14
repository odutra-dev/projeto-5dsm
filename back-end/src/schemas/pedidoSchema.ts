export const createPedidoSchema = {
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
    },
  },
  404: {
    type: "object",
    properties: {
      mensagem: { type: "string" },
    },
  },
};
