import { FastifyInstance } from "fastify";
import { createClient } from "./controllers/client/create-client";
import { client } from "./controllers/client/get-client";

export async function appRoutes(app: FastifyInstance) {
    app.post('/client', createClient)
    app.get('/client/:clientId', client)
}