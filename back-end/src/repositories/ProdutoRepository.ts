import { NovoProduto, Produto } from "../@types/typesProdutos";
import { collection, addDoc, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export class ProdutoRepository {
    async create(produto: NovoProduto): Promise<Produto> {

        // Cria uma referência com ID automático
        const novaRef = doc(collection(db, "produtos"));
        const idGerado = novaRef.id;
        
        const novoProduto:Produto = {
            id: idGerado,
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco
        };

        await setDoc(novaRef, novoProduto);
        return novoProduto;
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
    
      async findById(id: string): Promise<Produto | null> {
        const docRef = doc(db, "produtos", id);
        const snap = await getDoc(docRef);
    
        if (snap.exists()) {
          return {
            id: snap.id,
            ...(snap.data() as Omit<Produto, "id">)
          };
        }
        
        return null;
      }
    }