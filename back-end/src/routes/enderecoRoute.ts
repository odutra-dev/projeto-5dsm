// routes.ts
import { FastifyInstance } from "fastify";
import { NovoEndereco } from "../@types/typesEnderecos";
import { UseCaseEndereco } from "../usecases/UseCaseEndereco";
import { ClienteRepository } from "../repositories/ClienteRepository";

export async function enderecoRoute(app: FastifyInstance) {
    const useCaseProduto = new UseCaseEndereco();

    app.post<{ Body: NovoEndereco }>(
        "/",
        {
            schema: {
                tags: ["Endereço"],
                description: "Cria um novo endereço",
                body: {
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
                            minLength: 1
                        },

                    },
                    required: ["rua", "bairro", "numero", "clienteId"]
                },
                response: {
                    201: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            rua: { type: "string" },
                            bairro: { type: "string" },
                            numero: { type: "string" },
                            complemento: { type: "string" },
                            clienteId: { type: "string" },
                        }
                    }
                }
            }
        },
        async (request, reply) => {
            const useCaseEndereco = new UseCaseEndereco();

            // Aqui você precisará ter um repositório ou serviço para buscar o cliente:
            const clienteRepository = new ClienteRepository(); // <- instancie seu repo aqui

            try {
                const { cep, rua, bairro, numero, complemento, clienteId } = request.body;

                // ✅ Verifica se o cliente existe
                const clienteExiste = await clienteRepository.findById(clienteId);
                if (!clienteExiste) {
                    return reply.status(404).send({ mensagem: "Cliente não encontrado" });
                }

                const endereco = await useCaseEndereco.create({ 
                    cep, 
                    rua, 
                    bairro, 
                    numero, 
                    complemento, 
                    clienteId 
                });

                await clienteRepository.updateEndereco(clienteId, {
                    cep, 
                    rua, 
                    bairro, 
                    numero, 
                    complemento, 
                });

                return reply.status(201).send(endereco);
            } catch (error) {
                console.log(error);
                return reply.status(500).send({ message: error });
            }
        }
    );

    app.get("/", {
        schema: {
            tags: ["Endereço"],
            description: "Listar todos os endereço",
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object", properties: {
                            id: { type: "string" },
                            cep: { type: "string" },
                            bairro: { type: "string" },
                            numero: { type: "string" },
                            complemento: { type: "string" },
                            clienteId: { type: "string" },
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
            tags: ["Endereço"],
            description: "Buscar endereço por ID",
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
                    cep: { type: "string" },
                    rua: { type: "string" },
                    bairro: { type: "string" },
                    numero: { type: "string" },
                    complemento: { type: "string" },
                    clientId: { type: "string" }
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
        const endereco = await useCaseProduto.findById(id);
        if (!endereco) return res.status(404).send({ mensagem: "Endereço não encontrado" });
        return endereco;
    });


}
