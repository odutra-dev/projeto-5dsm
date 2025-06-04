export const createAdminSchema = {
    type: "object",
    properties: {
      nome: {
        type: "string",
        minLength: 3,
        maxLength: 100,
      },
      email: {
        type: "string",
        minLength: 3,
        maxLength: 255,
      },
      senha: {
        type: "string",
        minLength: 3,
        maxLength: 255,
      },
    },
    required: ["nome", "email", "senha"],
  };
  
  export const createAdminResponseSchema = {
    "201": {
      type: "object",
      properties: {
        id: { type: "string" },
        nome: { type: "string" },
        email: { type: "string" },
        // senha: { type: "string" }, // preferível não retornar a senha
      },
    },
  };
  
  export const getAllAdminsResponseSchema = {
    "200": {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          nome: { type: "string" },
          email: { type: "string" },
          // senha: { type: "string" }, // remova se não quiser mostrar senha
        },
      },
    },
  };
  
  export const getAdminResponseSchema = {
    "200": {
      type: "object",
      properties: {
        id: { type: "string" },
        nome: { type: "string" },
        email: { type: "string" },
        // senha: { type: "string" },
      },
    },
    "404": {
      type: "object",
      properties: {
        mensagem: { type: "string" },
      },
    },
  };
  