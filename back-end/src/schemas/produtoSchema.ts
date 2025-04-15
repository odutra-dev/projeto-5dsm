export const createProdutoSchema = {
  type: "object",
  properties: {
    nome: { type: "string" },
    descricao: { type: "string" },
    preco: { type: "string", pattern: "^[0-9]+(\\.[0-9]{1,2})?$" },
    file: { type: "string", format: "binary" },
  },
  required: ["nome", "descricao", "preco"],
};

export const createProdutoResponseSchema = {
  201: {
    type: "object",
    properties: {
      id: { type: "string" },
      nome: { type: "string" },
      descricao: { type: "string" },
      preco: { type: "number" },
      imagemUrl: { type: "string" },
    },
  },
};

export const getAllProdutosResponseSchema = {
  200: {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: { type: "string" },
        nome: { type: "string" },
        descricao: { type: "string" },
        preco: { type: "number" },
        imagemUrl: { type: "string" }, // ✅ imagem no GET all
      },
    },
  },
};

export const getProdutosResponseSchema = {
  200: {
    type: "object",
    properties: {
      id: { type: "string" },
      nome: { type: "string" },
      descricao: { type: "string" },
      preco: { type: "number" },
      imagemUrl: { type: "string" }, // ✅ imagem na busca por ID
    },
  },
  404: {
    type: "object",
    properties: {
      mensagem: { type: "string" },
    },
  },
};
