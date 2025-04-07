// routes.ts
import { FastifyInstance } from "fastify";
import { NovoProduto } from "../@types/typesProdutos";
import { UseCaseProduto } from "../usecases/UseCaseProduto";

export async function produtoRoute(app: FastifyInstance) {
    const useCaseProduto = new UseCaseProduto();

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
                            id: { type: "string" },
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
                const { nome, descricao, preco } = request.body;
                const produto = await useCaseProduto.create({ nome, descricao, preco });
                return reply.status(201).send(produto);
            } catch (error) {
                console.log(error);
                return reply.status(500).send({ message: error });
            }
        }
    );

    app.get("/", {
        schema: {
            tags: ["Produto"],
            description: "Listar todos os produtos",
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object", properties: {
                            id: { type: "string" },
                            nome: { type: "string" },
                            descricao: { type: "string" },
                            preco: { type: "number" },
                        },
                    },
                },
            },
        }
    }, async () => {
        return await useCaseProduto.findAll();
    });

    app.get<{ Params: { id: string } }>("/:id", {
        schema: {
            tags: ["Produto"],
            description: "Buscar produto por ID",
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
                required: ["id"]
            },
            response: {
                200: { type: "object", properties: {
                    id: { type: "string" },
                    nome: { type: "string" },
                    descricao: { type: "string" },
                    preco: { type: "number" },
                },},
                404: {
                    type: "object",
                    properties: {
                        mensagem: { type: "string" },
                    },
                },
            },
        },
    }, async (req, res) => {
        const { id } = req.params;
        const produto = await useCaseProduto.findById(id);
        if (!produto) return res.status(404).send({ mensagem: "Produto não encontrado" });
        return produto;
    });


}
