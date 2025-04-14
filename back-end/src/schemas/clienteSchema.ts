export const createClienteSchema = {
  type: "object",
  properties: {
    nome: {
      type: "string",
      minLength: 3,
      maxLength: 100,
    },
    telefone: {
      type: "string",
      minLength: 3,
      maxLength: 255,
    },
  },
  required: ["nome", "telefone"],
};

export const createClienteResponseSchema = {
  201: {
    type: "object",
    properties: {
      id: { type: "string" },
      nome: { type: "string" },
      telefone: { type: "string" },
    },
  },
};

export const getAllClientesResponseSchema = {
  200: {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: { type: "string" },
        nome: { type: "string" },
        telefone: { type: "string" },
      },
    },
  },
};

export const getClienteResponseSchema = {
  200: {
    type: "object",
    properties: {
      id: { type: "string" },
      nome: { type: "string" },
      telefone: { type: "string" },
    },
  },
  404: {
    type: "object",
    properties: {
      mensagem: { type: "string" },
    },
  },
};
