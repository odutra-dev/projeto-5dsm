export const createEnderecoSchema = {
  type: "object",
  properties: {
    cep: {
      type: "string",
      minLength: 3,
      maxLength: 100,
    },
    rua: {
      type: "string",
      minLength: 3,
      maxLength: 255,
    },
    bairro: {
      type: "string",
      minLength: 3,
      maxLength: 255,
    },
    numero: {
      type: "string",
      minLength: 3,
      maxLength: 255,
    },
    complemento: {
      type: "string",
      minLength: 3,
      maxLength: 255,
    },
    clienteId: {
      type: "string",
      minLength: 1,
    },
  },
  required: ["rua", "bairro", "numero", "clienteId"],
};

export const createEnderecoResponseSchema = {
  201: {
    type: "object",
    properties: {
      id: { type: "string" },
      rua: { type: "string" },
      bairro: { type: "string" },
      numero: { type: "string" },
      complemento: { type: "string" },
      clienteId: { type: "string" },
    },
  },
};

export const getAllEnderecosResponseSchema = {
  200: {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: { type: "string" },
        cep: { type: "string" },
        bairro: { type: "string" },
        numero: { type: "string" },
        complemento: { type: "string" },
        clienteId: { type: "string" },
      },
    },
  },
};

export const getEnderecosResponseSchema = {
  200: {
    type: "object",
    properties: {
      id: { type: "string" },
      cep: { type: "string" },
      rua: { type: "string" },
      bairro: { type: "string" },
      numero: { type: "string" },
      complemento: { type: "string" },
      clientId: { type: "string" },
    },
  },
  404: {
    type: "object",
    properties: {
      mensagem: { type: "string" },
    },
  },
};
