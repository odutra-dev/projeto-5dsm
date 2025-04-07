import { NovoProduto, Produto } from "../@types/typesProdutos";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

export class UseCaseProduto {
    private repository: ProdutoRepository;

    constructor(){
        this.repository = new ProdutoRepository();
    }
    async create({nome, descricao, preco}: NovoProduto): Promise<Produto> {
        const category = await this.repository.create({ nome, descricao, preco });
        return category;    
    }

    async findAll(): Promise<Produto[]> {
        const produtos = await this.repository.findAll();
        return produtos;
      }
    
      async findById(id: string): Promise<Produto | null> {
        const produto = await this.repository.findById(id);
        return produto;
      }
}