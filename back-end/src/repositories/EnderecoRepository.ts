import { NovoEndereco, Endereco } from "../@types/typesEnderecos";
import { collection, doc, setDoc, getDocs, getDoc, Firestore } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export class EnderecoRepository {
    async create(endereco: NovoEndereco): Promise<Endereco> {

        // Cria uma referência com ID automático
        const novaRef = doc(collection(db, "endereços"));
        const idGerado = novaRef.id;
        
        const novoEndereco:Endereco = {
            id: idGerado,
            cep: endereco.cep,
            rua: endereco.rua,
            bairro: endereco.bairro,
            numero: endereco.numero,
            complemento: endereco.complemento,
            clienteId: endereco.clienteId
        };

        await setDoc(novaRef, novoEndereco);
        return novoEndereco;
    }
    

    async findAll(): Promise<Endereco[]> {
        const enderecoCol = collection(db, "endereços");
        const snapshot = await getDocs(enderecoCol);
    
        const enderecos: Endereco[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Endereco, "id">)
        }));
    
        return enderecos;
      }
    
      async findById(id: string): Promise<Endereco | null> {
        const docRef = doc(db, "endereços", id);
        const snap = await getDoc(docRef);
    
        if (snap.exists()) {
          return {
            id: snap.id,
            ...(snap.data() as Omit<Endereco, "id">)
          };
        }
        
        return null;
      }
    }