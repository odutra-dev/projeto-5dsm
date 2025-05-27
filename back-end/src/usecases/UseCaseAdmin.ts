// usecases/UseCaseAdmin.ts
import { Admin, NovoAdmin } from "../@types/typesAdmin";
import { AdminRepository } from "../repositories/AdminRepository";
import { encrypt, decrypt } from "../utils/aes";

export class UseCaseAdmin {
  private repository: AdminRepository;

  constructor() {
    this.repository = new AdminRepository();
  }

  async create({ nome, email, senha }: NovoAdmin): Promise<Omit<Admin, "senha">> {
    const encryptedEmail = encrypt(email);
    const encryptedSenha = encrypt(senha);

    const admin = await this.repository.create({
      nome,
      email: encryptedEmail,
      senha: encryptedSenha,
    });

    return {
      ...admin,
      email, // retorna o e-mail descriptografado
      // não retorna a senha
    };
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
