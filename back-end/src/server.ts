import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastifySwagger } from "@fastify/swagger";
import { adminRoute } from "./routes/adminRoute";
import { produtoRoute } from "./routes/produtoRoute";
import { clienteRoute } from "./routes/clienteRoute";
import { enderecoRoute } from "./routes/enderecoRoute";
import { categoriaRoute } from "./routes/categoriaRoute";
import { pedidoRoute } from "./routes/pedidoRoute";
import fastifyStatic from "@fastify/static"; // Importando o plugin para arquivos estáticos
import path from "path"; // Importando path para resolver o caminho do diretório
import fs from "fs";

const app = fastify({ logger: true });

// Registro de plugins
app.register(cors, {allowedHeaders: "*" });

app.register(fastifyMultipart, {
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    fieldSize: 100, // Max field value size in bytes
    fields: 10, // Max number of non-file fields
    fileSize: 10000000, // For multipart forms, the max file size in bytes
    files: 1, // Max number of file fields
    headerPairs: 2000, // Max number of header key=>value pairs
    parts: 1000, // For multipart forms, the max number of parts (fields + files)
  },
});

// Configuração para servir arquivos estáticos da pasta "uploads"
app.register(fastifyStatic, {
  root: path.join(__dirname, "..", "uploads"), // Diretório onde as imagens serão salvas
  prefix: "/uploads/", // Prefixo para acessar as imagens via URL
});

// Configuração do Swagger
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Geladinho Santista API",
      description: "API para Geladinho Santista",
      version: "1.0.0",
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
});

// Registrando as rotas com prefixos
app.register(adminRoute, {
  prefix: "/admins",
});

app.register(clienteRoute, {
  prefix: "/clientes",
});

app.register(produtoRoute, {
  prefix: "/produtos",
});

app.register(enderecoRoute, {
  prefix: "/enderecos",
});

app.register(categoriaRoute, {
  prefix: "/categoria",
});

app.register(pedidoRoute, {
  prefix: "/pedido",
});

const PORT = Number(process.env.PORT) || 8001;

// Iniciar o servidor
app.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  const fileName = process.env.STORAGEFILENAME;
  const filePath = path.join(__dirname, "/firebase/", fileName);
  const content = JSON.stringify(
    {
      type: process.env.TYPE,
      project_id: process.env.PROJECTID,
      private_key_id: process.env.PRIVATEKEYID,
      private_key: process.env.PRIVATEKEY,
      client_email: process.env.CLIENTEMAIL,
      client_id: process.env.CLIENTID,
      auth_uri: process.env.AUTHURI,
      token_uri: process.env.TOKENURI,
      auth_provider_x509_cert_url: process.env.AUTHPROVIDERX509CERTURL,
      client_x509_cert_url: process.env.CLIENTX509CERTURL,
      universe_domain: process.env.UNIVERSEDOMAIN,
    },
    null,
    2
  );

  if (!fs.existsSync(filePath)) {
    fs.writeFile(filePath, content, (errWrite) => {
      if (errWrite) {
        console.error("Erro ao criar o arquivo:", errWrite);
      } else {
        console.log("Arquivo test.json criado com sucesso.");
      }
    });
  }

  const uploadPath = path.join(__dirname, "..", "uploads");

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log("Pasta uploads criada com sucesso.");
  }

  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
