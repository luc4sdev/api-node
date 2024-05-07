import { FastifyInstance } from "fastify";
import { createClient, registerBodySchema } from "./controllers/client/create-client/create-client";
import { getClient } from "./controllers/client/get-client/get-client";
import { getAllClients } from "./controllers/client/get-all-clients/get-all-clients";
import { updateClient } from "./controllers/client/update-client/update-client";
import { deleteClient } from "./controllers/client/delete-client/delete-client";
import { getAddress } from "./controllers/address/get-address/get-address";
import { createRouter } from "./controllers/router/create-router/create-router";
import { getRouter } from "./controllers/router/get-router/get-router";
import { getAllRouters } from "./controllers/router/get-all-routers/get-all-routers";
import { updateRouter } from "./controllers/router/update-router/update-router";
import { deleteRouter } from "./controllers/router/delete-router/delete-router";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'

export async function appRoutes(app: FastifyInstance) {
    // Clients routes

    app.withTypeProvider<ZodTypeProvider>().post(
        '/client',
        {
            schema: {
                tags: ['Clients'],
                summary: 'Create a new client',
                body: registerBodySchema,
            },
        }, createClient)
    //app.post('/client', createClient)
    app.get('/get-clients', getAllClients)
    app.get('/client/:clientId', getClient)
    app.put('/update-client', updateClient)
    app.put('/delete-client', deleteClient)

    // Address route
    app.get('/address/:addressId', getAddress)

    // Routers routes
    app.post('/router', createRouter)
    app.get('/router/:routerId', getRouter)
    app.get('/get-routers', getAllRouters)
    app.put('/update-router', updateRouter)
    app.put('/delete-router', deleteRouter)



}