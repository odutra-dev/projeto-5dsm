import { NovoProduto, Produto } from "../@types/typesProdutos";
import { collection, doc, setDoc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export class ProdutoRepository {
  // Criação do produto
  async create(produto: NovoProduto): Promise<Produto> {
    const novaRef = doc(collection(db, "produtos"));
    const idGerado = novaRef.id;

    const novoProduto: Produto = {
      id: idGerado,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      imagemUrl: produto.imagemUrl ?? "", // Caso imagemUrl seja undefined, será uma string vazia
    };

    await setDoc(novaRef, novoProduto);
    return novoProduto;
  }

  // Atualizar categoria de produto
  async updateCategoria(produtoId: string, categoria: { nome: string }) {
    const produtoRef = doc(db, "produtos", produtoId);
    const produtoSnap = await getDoc(produtoRef);

    if (!produtoSnap.exists()) {
      throw new Error("Produto não encontrado para atualização.");
    }

    return await updateDoc(produtoRef, { categoria });
  }

  // Listar todos os produtos
  async findAll(): Promise<Produto[]> {
    const produtoCol = collection(db, "produtos");
    const snapshot = await getDocs(produtoCol);

    const produtos: Produto[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Produto, "id">),
      imagemUrl: doc.data().imagemUrl ?? "" // Garantir que imagemUrl seja sempre uma string
    }));

    return produtos;
  }

  // Buscar produto por ID
  async findById(produtoId: string): Promise<Produto | null> {
    const ref = doc(db, "produtos", produtoId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    const data = snap.data();
    const produto: Produto = {
      id: produtoId,
      nome: data?.nome ?? "", // Caso nome seja undefined, será uma string vazia
      descricao: data?.descricao ?? "", // Caso descricao seja undefined, será uma string vazia
      preco: data?.preco ?? 0, // Caso preco seja undefined, será 0
      imagemUrl: data?.imagemUrl ?? "" // Caso imagemUrl seja undefined, será uma string vazia
    };

    return produto;
  }
}
