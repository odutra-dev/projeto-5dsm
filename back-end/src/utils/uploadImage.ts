// utils/uploadImage.ts
import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as fs from "fs";

export async function uploadImagemParaStorage(caminhoArquivo: string, nomeArquivo: string): Promise<string> {
  const buffer = fs.readFileSync(caminhoArquivo);
  const storageRef = ref(storage, `produtos/${nomeArquivo}`);
  const metadata = { contentType: "image/jpeg" }; // ou detecte dinamicamente

  await uploadBytes(storageRef, buffer, metadata);
  const url = await getDownloadURL(storageRef);

  return url;
}
