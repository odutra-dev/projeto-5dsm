import { doc, getDoc } from "firebase/firestore";
import { NovoProduto, Produto } from "../@types/typesProdutos";
import { ProdutoRepository } from "../repositories/ProdutoRepository";
import { db } from "../firebase/firebaseConfig";

export class UseCaseProduto {
  private repository: ProdutoRepository;

  constructor() {
    this.repository = new ProdutoRepository();
  }

  async create({ nome, descricao, preco, imagemUrl }: NovoProduto): Promise<Produto> {
    const produto = await this.repository.create({ nome, descricao, preco, imagemUrl }); // ✅ incluído
    return produto;
  }

  async findAll(): Promise<Produto[]> {
    const produtos = await this.repository.findAll();
    return produtos;
  }

  async findById(produtoId: string): Promise<Produto | null> {
    const ref = doc(db, "produtos", produtoId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
  
    const data = snap.data();
    return {
      id: snap.id,
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco,
      imagemUrl: data.imagemUrl ?? ""
    };
  }
  
}
