import { NovoCliente, Cliente } from "../@types/typesClientes";
import { ClienteRepository } from "../repositories/ClienteRepository";

export class UseCaseCliente {
    private repository: ClienteRepository;

    constructor(){
        this.repository = new ClienteRepository();
    }
    async create({nome, telefone}: NovoCliente): Promise<Cliente> {
        const category = await this.repository.create({ nome, telefone });
        return category;    
    }

    async findAll(): Promise<Cliente[]> {
        const cliente = await this.repository.findAll();
        return cliente;
      }
    
      async findById(id: string): Promise<Cliente | null> {
        const cliente = await this.repository.findById(id);
        return cliente;
      }
}