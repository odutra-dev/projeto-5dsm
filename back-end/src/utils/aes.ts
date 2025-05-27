import crypto from "crypto";

// AES-256-GCM => chave: 32 bytes | IV: 12 bytes

const key = process.env.AES_SECRET_KEY;
const iv = process.env.AES_IV;

if (!key || key.length !== 32) {
  throw new Error("AES_SECRET_KEY precisa ter exatamente 32 caracteres.");
}

if (!iv || iv.length !== 12) {
  throw new Error("AES_IV precisa ter exatamente 12 caracteres.");
}

// Aqui já é seguro usar `key!` e `iv!` pois validamos antes
export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    Buffer.from(key!, "utf8"),
    Buffer.from(iv!, "utf8")
  );

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  return `${encrypted}:${authTag}`;
}

export function decrypt(encryptedText: string): string {
  const [encrypted, authTag] = encryptedText.split(":");

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    Buffer.from(key!, "utf8"),
    Buffer.from(iv!, "utf8")
  );

  decipher.setAuthTag(Buffer.from(authTag, "hex"));

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
