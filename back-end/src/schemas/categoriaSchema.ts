export const createCategoriaSchema = {
  type: "object",
  properties: {
    nome: {
      type: "string",
      minLength: 3,
      maxLength: 100,
    },
    produtoId: {
      type: "string",
      minLength: 1,
    },
  },
  required: ["nome", "produtoId"],
};

export const createCategoriaResponseSchema = {
  201: {
    type: "object",
    properties: {
      id: { type: "string" },
      nome: { type: "string" },
      produtoId: { type: "string" },
    },
  },
};

export const getAllCategoriasResponseSchema = {
  200: {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: { type: "string" },
        nome: { type: "string" },
        produtoId: { type: "string" },
      },
    },
  },
};

export const getCategoriaResponseSchema = {
  200: {
    type: "object",
    properties: {
      id: { type: "string" },
      nome: { type: "string" },
      produtoId: { type: "string" },
    },
  },
  404: {
    type: "object",
    properties: {
      mensagem: { type: "string" },
    },
  },
};
