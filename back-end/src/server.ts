import fastify from "fastify";
import cors from "@fastify/cors";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastifySwagger } from "@fastify/swagger";
import { produtoRoute } from "./routes/produtoRoute";
import { clienteRoute } from "./routes/clienteRoute";
import { enderecoRoute } from "./routes/enderecoRoute";
import { categoriaRoute } from "./routes/categoriaRoute";

const app = fastify();

app.register(cors);


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


app.listen({ port: 8001 }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at http://localhost:${8001}`);
  });


