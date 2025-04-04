import fastify from "fastify";
import cors from "@fastify/cors";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastifySwagger } from "@fastify/swagger";
import { request } from "http";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./firebase/firebaseConfig"

const app = fastify();

app.register(cors);

app.listen({ port: 8001 }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at http://localhost:${8001}`);
  });


