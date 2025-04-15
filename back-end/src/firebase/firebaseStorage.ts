// utils/firebaseStorage.ts
import admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";

const serviceAccount = require("../firebase/geladinho-santos-firebase-admin.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "seu-bucket.appspot.com"
  });
}

const bucket = getStorage().bucket();

export async function uploadToFirebaseStorage(filename: string, buffer: Buffer, contentType: string): Promise<string> {
  const file = bucket.file(`produtos/${Date.now()}-${filename}`);
  await file.save(buffer, {
    metadata: { contentType }
  });
  await file.makePublic(); // ou use token se quiser privado
  return file.publicUrl();
}
