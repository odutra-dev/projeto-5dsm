import { NovoProduto, Produto } from "../@types/typesProdutos";
import { collection, doc, setDoc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export class ProdutoRepository {
  async create(produto: NovoProduto): Promise<Produto> {
    const novaRef = doc(collection(db, "produtos"));
    const idGerado = novaRef.id;

    const novoProduto: Produto = {
      id: idGerado,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      imagemUrl: produto.imagemUrl // ✅ salva a URL da imagem
    };

    await setDoc(novaRef, novoProduto);
    return novoProduto;
  }

  async updateCategoria(produtoId: string, categoria: {
    nome: string;
  }) {
    const produtoRef = doc(db, "produtos", produtoId);
    return await updateDoc(produtoRef, { categoria });
  }

  async findAll(): Promise<Produto[]> {
    const produtoCol = collection(db, "produtos");
    const snapshot = await getDocs(produtoCol);

    const produtos: Produto[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Produto, "id">)
    }));

    return produtos;
  }

  async findById(produtoId: string): Promise<{ nome: string; imagemUrl: string } | null> {
    const ref = doc(db, "produtos", produtoId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
      nome: data.nome,
      imagemUrl: data.imagemUrl ?? ""
    };
  }
}
