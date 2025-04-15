import { NovoEndereco, Endereco } from "../@types/typesEnderecos";
import { EnderecoRepository } from "../repositories/EnderecoRepository";

export class UseCaseEndereco {
    private repository: EnderecoRepository;

    constructor(){
        this.repository = new EnderecoRepository();
    }
    async create({cep, rua, bairro, numero, complemento, clienteId}: NovoEndereco): Promise<Endereco> {
        const category = await this.repository.create({ cep, rua, bairro, numero, complemento, clienteId });
        return category;    
    }

    async findAll(): Promise<Endereco[]> {
        const enderecos = await this.repository.findAll();
        return enderecos;
      }
    
      async findById(id: string): Promise<Endereco | null> {
        const endereco = await this.repository.findById(id);
        return endereco;
      }
}