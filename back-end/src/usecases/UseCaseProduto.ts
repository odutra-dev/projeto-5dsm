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
}