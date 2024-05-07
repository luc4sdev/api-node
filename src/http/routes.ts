import { FastifyInstance } from "fastify";
import { createClient } from "./controllers/create-client";

export async function appRoutes(app: FastifyInstance) {
    app.post('/clients', createClient)
}