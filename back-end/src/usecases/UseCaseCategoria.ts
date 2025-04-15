import { NovoCategoria, Categoria } from "../@types/typesCategorias";
import { CategoriaRepository } from "../repositories/CategoriaRepository";

export class UseCaseCategoria {
    private repository: CategoriaRepository;

    constructor(){
        this.repository = new CategoriaRepository();
    }
    async create({nome, produtoId}: NovoCategoria): Promise<Categoria> {
        const category = await this.repository.create({ nome, produtoId });
        return category;    
    }

    async findAll(): Promise<Categoria[]> {
        const categorias = await this.repository.findAll();
        return categorias;
      }
    
      async findById(id: string): Promise<Categoria | null> {
        const categoria = await this.repository.findById(id);
        return categoria;
      }
}