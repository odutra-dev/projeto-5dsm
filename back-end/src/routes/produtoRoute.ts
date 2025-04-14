import { FastifyInstance } from "fastify";
import { NovoProduto } from "../@types/typesProdutos";
import { UseCaseProduto } from "../usecases/UseCaseProduto";
import { pipeline } from "stream";
import { promisify } from "util";
import path, { format } from "path";
import * as fs from "fs"; // Importando corretamente a biblioteca fs
import { MultipartFile } from "@fastify/multipart";
import {
  createProdutoResponseSchema,
  createProdutoSchema,
  getAllProdutosResponseSchema,
  getProdutosResponseSchema,
} from "../schemas/produtoSchema";

export async function produtoRoute(app: FastifyInstance) {
  const useCaseProduto = new UseCaseProduto();
  const pump = promisify(pipeline);

  // POST - Criar produto com JSON ou upload de imagem
  app.post<{ Body: NovoProduto }>(
    "/",
    {
      schema: {
        tags: ["Produto"],
        description: "Cria um novo produto (JSON ou form-data com imagem)",
        consumes: ["multipart/form-data"],
        /*        body: createProdutoSchema,    */

        response: createProdutoResponseSchema,
      },
      attachValidation: false,
    },
    async (request, reply) => {
      const contentType = request.headers["content-type"] || "";
      let nome = "",
        descricao = "",
        preco: number = 0,
        imagemUrl = "";

      try {
        if (contentType.includes("application/json")) {
          const body = request.body as NovoProduto;

          nome = body.nome;
          descricao = body.descricao;
          preco = Number(body.preco);
          imagemUrl = body.imagemUrl || "";
        } else if (contentType.includes("multipart/form-data")) {
          const data: Record<string, any> = {};
          const parts = request.parts();

          for await (const part of parts) {
            if (part.type === "file") {
              const file = part as MultipartFile;
              const filename = `${Date.now()}-${file.filename}`;
              const filepath = path.join(__dirname, "..", "uploads", filename);
              await pump(file.file, fs.createWriteStream(filepath));
              imagemUrl = `/uploads/${filename}`;
            } else if (part.type === "field") {
              data[part.fieldname] = part.value;
            }
          }

          nome = data.nome;
          descricao = data.descricao;
          preco = Number(data.preco);
        } else {
          return reply
            .status(400)
            .send({ message: "Tipo de conteúdo inválido." });
        }

        // Validação comum
        if (!nome || !descricao || !preco) {
          return reply
            .status(400)
            .send({ message: "Campos obrigatórios faltando." });
        }

        const produto = await useCaseProduto.create({
          nome,
          descricao,
          preco,
          imagemUrl,
        });
        return reply.status(201).send(produto);
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Erro ao criar produto." });
      }
    }
  );

  // GET - Listar todos os produtos
  app.get(
    "/",
    {
      schema: {
        tags: ["Produto"],
        description: "Listar todos os produtos",
        response: getAllProdutosResponseSchema,
      },
    },
    async () => {
      return await useCaseProduto.findAll();
    }
  );

  // GET - Buscar produto por ID
  app.get<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        tags: ["Produto"],
        description: "Buscar produto por ID",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        response: getProdutosResponseSchema,
      },
    },
    async (req, res) => {
      const { id } = req.params;
      const produto = await useCaseProduto.findById(id);
      if (!produto)
        return res.status(404).send({ mensagem: "Produto não encontrado" });
      return produto;
    }
  );
}
