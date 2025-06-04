import { NovoCliente, Cliente } from "../@types/typesClientes";
import { collection, doc, setDoc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Admin, NovoAdmin } from "../@types/typesAdmin";

export class AdminRepository {
  async create(admin: NovoAdmin): Promise<Admin> {
    const novaRef = doc(collection(db, "admins"));
    const idGerado = novaRef.id;

    const NovoAdmin: Admin = {
      id: idGerado,
      nome: admin.nome,
      email: admin.email,
      senha: admin.senha
    };

    await setDoc(novaRef, NovoAdmin);
    return NovoAdmin;
  }
  

  async findAll(): Promise<Admin[]> {
    const adminCol = collection(db, "admins");
    const snapshot = await getDocs(adminCol);

    const admins: Admin[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Admin, "id">),
    }));

    return admins;
  }

  async findById(id: string): Promise<Admin | null> {
    const docRef = doc(db, "admins", id);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      return {
        id: snap.id,
        ...(snap.data() as Omit<Admin, "id">),
      };
    }

    return null;
  }
}
