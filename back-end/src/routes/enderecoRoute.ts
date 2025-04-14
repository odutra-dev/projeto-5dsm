// routes.ts
import { FastifyInstance } from "fastify";
import { NovoEndereco } from "../@types/typesEnderecos";
import { UseCaseEndereco } from "../usecases/UseCaseEndereco";
import { ClienteRepository } from "../repositories/ClienteRepository";
import {
  createEnderecoResponseSchema,
  createEnderecoSchema,
  getAllEnderecosResponseSchema,
  getEnderecosResponseSchema,
} from "../schemas/enderecoSchema";

export async function enderecoRoute(app: FastifyInstance) {
  const useCaseEndereco = new UseCaseEndereco();

  app.post<{ Body: NovoEndereco }>(
    "/",
    {
      schema: {
        tags: ["Endereço"],
        description: "Cria um novo endereço",
        body: createEnderecoSchema,
        response: createEnderecoResponseSchema,
      },
    },
    async (request, reply) => {
      const useCaseEndereco = new UseCaseEndereco();

      // Aqui você precisará ter um repositório ou serviço para buscar o cliente:
      const clienteRepository = new ClienteRepository(); // <- instancie seu repo aqui

      try {
        const { cep, rua, bairro, numero, complemento, clienteId } =
          request.body;

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
          clienteId,
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

  app.get(
    "/",
    {
      schema: {
        tags: ["Endereço"],
        description: "Listar todos os endereço",
        response: getAllEnderecosResponseSchema,
      },
    },
    async () => {
      return await useCaseEndereco.findAll();
    }
  );

  app.get<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        tags: ["Endereço"],
        description: "Buscar endereço por ID",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        response: getEnderecosResponseSchema,
      },
    },
    async (req, res) => {
      const { id } = req.params;
      const endereco = await useCaseEndereco.findById(id);
      if (!endereco)
        return res.status(404).send({ mensagem: "Endereço não encontrado" });
      return endereco;
    }
  );
}
