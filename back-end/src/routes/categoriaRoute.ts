// routes.ts
import { FastifyInstance } from "fastify";
import { NovoCategoria } from "../@types/typesCategorias";
import { UseCaseCategoria } from "../usecases/UseCaseCategoria";
import { ProdutoRepository } from "../repositories/ProdutoRepository";
import {
  createCategoriaResponseSchema,
  createCategoriaSchema,
  getAllCategoriasResponseSchema,
  getCategoriaResponseSchema,
} from "../schemas/categoriaSchema";

export async function categoriaRoute(app: FastifyInstance) {
  const useCaseCategoria = new UseCaseCategoria();

  app.post<{ Body: NovoCategoria }>(
    "/",
    {
      schema: {
        tags: ["Categoria"],
        description: "Cria uma nova categoria",
        body: createCategoriaSchema,
        response: createCategoriaResponseSchema,
      },
    },
    async (request, reply) => {
      const useCaseCategoria = new UseCaseCategoria();

      // Aqui você precisará ter um repositório ou serviço para buscar o produto:
      const produtoRepository = new ProdutoRepository(); // <- instancie seu repo aqui

      try {
        const { nome, produtoId } = request.body;

        // ✅ Verifica se o produto existe
        const produtoExiste = await produtoRepository.findById(produtoId);
        if (!produtoExiste) {
          return reply.status(404).send({ mensagem: "Produto não encontrado" });
        }

        const categoria = await useCaseCategoria.create({
          nome,
          produtoId,
        });

        await produtoRepository.updateCategoria(produtoId, {
          nome,
        });

        return reply.status(201).send(categoria);
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: error });
      }
    }
  );

  app.get(
    "/",
    {
      schema: {
        tags: ["Categoria"],
        description: "Listar todas as categorias",
        response: getAllCategoriasResponseSchema,
      },
    },
    async () => {
      return await useCaseCategoria.findAll();
    }
  );

  app.get<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        tags: ["Categoria"],
        description: "Buscar categoria por ID",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        response: getCategoriaResponseSchema,
      },
    },
    async (req, res) => {
      const { id } = req.params;
      const categoria = await useCaseCategoria.findById(id);
      if (!categoria)
        return res.status(404).send({ mensagem: "Produto não encontrado" });
      return categoria;
    }
  );
}
