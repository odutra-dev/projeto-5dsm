import { NovoCategoria, Categoria } from "../@types/typesCategorias";
import { collection, doc, setDoc, getDocs, getDoc, Firestore } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export class CategoriaRepository {
    async create(categoria: NovoCategoria): Promise<Categoria> {

        // Cria uma referência com ID automático
        const novaRef = doc(collection(db, "categorias"));
        const idGerado = novaRef.id;
        
        const NovoCategoria:Categoria = {
            id: idGerado,
            nome: categoria.nome,
        };

        await setDoc(novaRef, NovoCategoria);
        return NovoCategoria;
    }
    

    async findAll(): Promise<Categoria[]> {
        const categoriaCol = collection(db, "categorias");
        const snapshot = await getDocs(categoriaCol);
    
        const categorias: Categoria[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Categoria, "id">)
        }));
    
        return categorias;
      }
    
      async findById(id: string): Promise<Categoria | null> {
        const docRef = doc(db, "categorias", id);
        const snap = await getDoc(docRef);
    
        if (snap.exists()) {
          return {
            id: snap.id,
            ...(snap.data() as Omit<Categoria, "id">)
          };
        }
        
        return null;
      }
    }