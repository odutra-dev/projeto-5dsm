import { doc, getDoc } from "firebase/firestore";
import { NovoProduto, Produto } from "../@types/typesProdutos";
import { ProdutoRepository } from "../repositories/ProdutoRepository";
import { db } from "../firebase/firebaseConfig";
import { uploadImagemParaStorage } from "../utils/uploadImage";
import * as fs from "fs";
import * as path from "path";

export class UseCaseProduto {
  private repository: ProdutoRepository;

  constructor() {
    this.repository = new ProdutoRepository();
  }

  async create({ nome, descricao, preco, imagemUrl }: NovoProduto): Promise<Produto> {
    let urlFinal = imagemUrl;
  
    if (imagemUrl && imagemUrl.startsWith("/uploads/")) {
      const nomeArquivo = imagemUrl.split("/").pop()!;
      const caminhoCompleto = path.join(__dirname, "..", imagemUrl);
  
      urlFinal = await uploadImagemParaStorage(caminhoCompleto, nomeArquivo);
  
      // remove arquivo local depois
      fs.unlink(caminhoCompleto, (err) => {
        if (err) console.error("Erro ao remover arquivo:", err);
      });
    }
  
    // aqui o UseCase apenas chama o repository
    const produto = await this.repository.create({
      nome,
      descricao,
      preco,
      imagemUrl: urlFinal
    });
  
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
      imagemUrl: data.imagemUrl || "" // Garantir que imagemUrl sempre tenha um valor padrão, mesmo que seja vazio
    };
  }
}
