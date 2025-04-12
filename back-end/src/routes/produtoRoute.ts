import { FastifyInstance } from "fastify";
import { NovoProduto } from "../@types/typesProdutos";
import { UseCaseProduto } from "../usecases/UseCaseProduto";
import { pipeline } from 'stream';
import { promisify } from 'util';
import path from "path";
import * as fs from "fs"; // Importando corretamente a biblioteca fs
import { MultipartFile } from "@fastify/multipart";

export async function produtoRoute(app: FastifyInstance) {
  const useCaseProduto = new UseCaseProduto();
  const pump = promisify(pipeline);

  // POST - Criar produto com JSON ou upload de imagem
  app.post<{ Body: NovoProduto }>(
    "/",
    {
      schema: {
        tags: ["Produto"],
        description: "Cria um novo produto (via form-data)",
        consumes: ["multipart/form-data"],
        /* body: {
          type: "object",
          properties: {
            nome: { type: "string" },
            descricao: { type: "string" },
            preco: { type: "string" },
            file: { type: "string", format: "binary" }
          }
        }, */
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "string" },
              nome: { type: "string" },
              descricao: { type: "string" },
              preco: { type: "number" },
              imagemUrl: { type: "string" }
            }
          }
        }
      },
    },
    async (request, reply) => {
      const contentType = request.headers["content-type"] || "";
  
      // --- JSON comum ---
      if (contentType.includes("application/json")) {
        const { nome, descricao, preco, imagemUrl } = request.body as NovoProduto;
  
        if (!nome || !descricao || !preco) {
          return reply.status(400).send({ message: "Campos obrigatórios faltando." });
        }
  
        try {
          const produto = await useCaseProduto.create({ nome, descricao, preco, imagemUrl });
          return reply.status(201).send(produto);
        } catch (error) {
          console.error(error);
          return reply.status(500).send({ message: "Erro ao criar produto." });
        }
      }
  
      // --- multipart/form-data com upload ---
      if (contentType.includes("multipart/form-data")) {
        const data: Record<string, any> = {};
        let imagemUrl = "";
  
        const parts = request.parts();
  
        for await (const part of parts) {
          if (part.type === "file") {
            const file = part as MultipartFile;
            const filename = `${Date.now()}-${part.fieldname}`;
            const filepath = path.join(__dirname, "..", "uploads", filename);
  
            await pump(file.file, fs.createWriteStream(filepath));
            imagemUrl = `/uploads/${filename}`;
          } else if (part.type === "field") {
            data[part.fieldname] = part.value as string;
          }
        }
  
        if (!data.nome || !data.descricao || !data.preco || !imagemUrl) {
          return reply.status(400).send({ message: "Campos obrigatórios faltando." });
        }
  
        try {
          const produto = await useCaseProduto.create({
            nome: data.nome,
            descricao: data.descricao,
            preco: Number(data.preco),
            imagemUrl
          });
          return reply.status(201).send(produto);
        } catch (error) {
          console.error(error);
          return reply.status(500).send({ message: "Erro ao criar produto." });
        }
      }
  
      return reply.status(400).send({ message: "Tipo de conteúdo inválido." });
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
