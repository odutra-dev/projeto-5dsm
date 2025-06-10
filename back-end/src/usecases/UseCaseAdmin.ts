// usecases/UseCaseAdmin.ts
import { Admin, NovoAdmin } from "../@types/typesAdmin";
import { AdminRepository } from "../repositories/AdminRepository";
import { encrypt, decrypt } from "../utils/aes";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp, auth } from "../firebase/firebaseConfig"; // seu app Firebase

export class UseCaseAdmin {
  private repository: AdminRepository;

  constructor() {
    this.repository = new AdminRepository();
  }

  async create({
    nome,
    email,
    senha,
  }: NovoAdmin): Promise<Omit<Admin, "senha">> {
    const auth = getAuth(firebaseApp);

    try {
      // 1. Cria no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const firebaseUid = userCredential.user.uid;

      // 2. Criptografa email e senha
      const encryptedEmail = encrypt(email);
      const encryptedSenha = encrypt(senha);

      // 3. Cria no banco de dados com UID do Firebase
      const admin = await this.repository.create({
        nome,
        email: encryptedEmail,
        senha: encryptedSenha,
        firebaseUid,
      });

      return {
        ...admin,
        email, // retorna e-mail descriptografado
        // não retorna a senha
      };
    } catch (error) {
      console.error("Erro ao criar administrador:", error);
      throw new Error("Erro ao criar administrador");
    }
  }

  // Realiza o login de um administrador utilizando Firebase Auth com email e senha.
  // Se as credenciais forem válidas, retorna o token de autenticação (idToken).
  async login(email: string, senha: string): Promise<{ token: string }> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const token = await userCredential.user.getIdToken();
      return { token };
    } catch (error) {
      console.error("Erro no login:", error);
      throw new Error("Credenciais inválidas");
    }
  }

  async findAll(): Promise<Omit<Admin, "senha">[]> {
    const admins = await this.repository.findAll();

    return admins.map((admin) => ({
      ...admin,
      email: decrypt(admin.email),
      // não retorna senha
    }));
  }

  async findById(id: string): Promise<Omit<Admin, "senha"> | null> {
    const admin = await this.repository.findById(id);
    if (!admin) return null;

    return {
      ...admin,
      email: decrypt(admin.email),
      // não retorna senha
    };
  }
}
