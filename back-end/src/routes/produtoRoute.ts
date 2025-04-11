// routes.ts
import { FastifyInstance } from "fastify";
import { NovoProduto } from "../@types/typesProdutos";
import { UseCaseProduto } from "../usecases/UseCaseProduto";

export async function produtoRoute(app: FastifyInstance) {
  const useCaseProduto = new UseCaseProduto();

  // POST - Criar produto
  app.post<{ Body: NovoProduto }>(
    "/",
    {
      schema: {
        tags: ["Produto"],
        description: "Cria um novo produto",
        body: {
          type: "object",
          properties: {
            nome: { type: "string", minLength: 3 },
            descricao: { type: "string", minLength: 3 },
            preco: { type: "number" },
            imagemUrl: { type: "string", format: "uri" } // ✅ campo da imagem
          },
          required: ["nome", "descricao", "preco", "imagemUrl"]
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "string" },
              nome: { type: "string" },
              descricao: { type: "string" },
              preco: { type: "number" },
              imagemUrl: { type: "string" } // ✅ imagem na resposta também
            }
          }
        }
      }
    },
    async (request, reply) => {
      try {
        const { nome, descricao, preco, imagemUrl } = request.body;
        const produto = await useCaseProduto.create({ nome, descricao, preco, imagemUrl });
        return reply.status(201).send(produto);
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: error });
      }
    }
  );

  // GET - Listar todos os produtos
  app.get("/", {
    schema: {
      tags: ["Produto"],
      description: "Listar todos os produtos",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              nome: { type: "string" },
              descricao: { type: "string" },
              preco: { type: "number" },
              imagemUrl: { type: "string" } // ✅ imagem no GET all
            }
          }
        }
      }
    }
  }, async () => {
    return await useCaseProduto.findAll();
  });

  // GET - Buscar produto por ID
  app.get<{ Params: { id: string } }>("/:id", {
    schema: {
      tags: ["Produto"],
      description: "Buscar produto por ID",
      params: {
        type: "object",
        properties: {
          id: { type: "string" }
        },
        required: ["id"]
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            nome: { type: "string" },
            descricao: { type: "string" },
            preco: { type: "number" },
            imagemUrl: { type: "string" } // ✅ imagem na busca por ID
          }
        },
        404: {
          type: "object",
          properties: {
            mensagem: { type: "string" }
          }
        }
      }
    }
  }, async (req, res) => {
    const { id } = req.params;
    const produto = await useCaseProduto.findById(id);
    if (!produto) return res.status(404).send({ mensagem: "Produto não encontrado" });
    return produto;
  });
}
