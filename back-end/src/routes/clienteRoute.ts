// routes.ts
import { FastifyInstance } from "fastify";
import { NovoCliente } from "../@types/typesClientes";
import { UseCaseCliente } from "../usecases/UseCaseCliente";

export async function clienteRoute(app: FastifyInstance) {
    const useCaseCliente = new UseCaseCliente();

    app.post<{ Body: NovoCliente }>(
        "/",
        {
            schema: {
                tags: ["Cliente"],
                description: "Cria um novo cliente",
                body: {
                    type: "object",
                    properties: {
                        nome: {
                            type: "string",
                            minLength: 3,
                            maxLength: 100,
                        },
                        telefone: {
                            type: "string",
                            minLength: 3,
                            maxLength: 255,
                        },
                    },
                    required: ["nome", "telefone"]
                },
                response: {
                    201: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            nome: { type: "string" },
                            telefone: { type: "string" },
                        }
                    }
                }
            }
        },
        async (request, reply) => {
            const useCaseCliente = new UseCaseCliente();

            try {
                const { nome, telefone } = request.body;
                const cliente = await useCaseCliente.create({ nome, telefone });
                return reply.status(201).send(cliente);
            } catch (error) {
                console.log(error);
                return reply.status(500).send({ message: error });
            }
        }
    );

    app.get("/", {
        schema: {
            tags: ["Cliente"],
            description: "Listar todos os clientes",
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object", properties: {
                            id: { type: "string" },
                            nome: { type: "string" },
                            telefone: { type: "string" },
                        },
                    },
                },
            },
        }
    }, async () => {
        return await useCaseCliente.findAll();
    });

    app.get<{ Params: { id: string } }>("/:id", {
        schema: {
            tags: ["Cliente"],
            description: "Buscar cliente por ID",
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
                    telefone: { type: "string" },
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
        const cliente = await useCaseCliente.findById(id);
        if (!cliente) return res.status(404).send({ mensagem: "Cliente não encontrado" });
        return cliente;
    });


}
