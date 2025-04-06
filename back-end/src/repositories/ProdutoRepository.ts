import { NovoProduto, Produto } from "../@types/typesProdutos";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
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
}