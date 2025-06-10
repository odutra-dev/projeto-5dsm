import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Admin, NovoAdmin } from "../@types/typesAdmin";

import { encrypt, decrypt } from "../utils/aes";

export class AdminRepository {
  async create(admin: NovoAdmin): Promise<Admin> {
    const novaRef = doc(collection(db, "admins"));
    const idGerado = novaRef.id;

    const NovoAdmin: Admin = {
      id: idGerado,
      nome: admin.nome,
      email: admin.email,
      senha: admin.senha,
    };

    await setDoc(novaRef, NovoAdmin);
    return NovoAdmin;
  }

  async findAll(): Promise<Admin[]> {
    const adminCol = collection(db, "admins");
    const snapshot = await getDocs(adminCol);

    const admins: Admin[] = snapshot.docs.map((doc) => ({
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

  async findByEmail(email: string): Promise<Admin | null> {
    const adminCol = collection(db, "admins");
    const q = query(adminCol, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...(doc.data() as Omit<Admin, "id">),
    };
  }
}
