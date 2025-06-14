// eslint.config.ts (ou .js se você estiver usando JS)

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Para resolver caminhos corretamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cria compatibilidade com configuração "antiga"
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Configuração final do ESLint
const eslintConfig = [
  // Estende as configurações recomendadas do Next.js e TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Regras personalizadas
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
