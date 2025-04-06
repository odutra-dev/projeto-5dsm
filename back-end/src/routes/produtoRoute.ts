// routes.ts
import { FastifyInstance } from "fastify";
import { NovoProduto } from "../@types/typesProdutos";
import { UseCaseProduto } from "../usecases/UseCaseProduto";

export async function produtoRoute(app: FastifyInstance) {
    app.post<{ Body: NovoProduto }>(
        "/",
        {
            schema: {
                tags: ["Produto"],
                description: "Cria um novo produto",
                body: {
                    type: "object",
                    properties: {
                        nome: {
                            type: "string",
                            minLength: 3,
                            maxLength: 100,
                        },
                        descricao: {
                            type: "string",
                            minLength: 3,
                            maxLength: 255,
                        },
                        preco: {
                            type: "number",
                        },
                    },
                    required: ["nome", "descricao", "preco"]
                },
                response: {
                    201: {
                        type: "object",
                        properties: {
                            id: {type: "string"},
                            nome: { type: "string" },
                            descricao: { type: "string" }, 
                            preco: { type: "number" },
                        }
                    }
                }
            }
        },
        async (request, reply) => {
            const useCaseProduto = new UseCaseProduto();

            try {
                let { nome, descricao, preco } = request.body;
        
                const produto = await useCaseProduto.create({
                  nome, descricao, preco
                });
        
                return reply.status(201).send(produto);
              } catch (error) {
                console.log(error);
                return reply.status(500).send({ message: error });
              }
        }
    )
}