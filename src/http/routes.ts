import { FastifyInstance } from "fastify";
import { createClient } from "./controllers/client/create-client/create-client";
import { getClient } from "./controllers/client/get-client/get-client";
import { getAllClients } from "./controllers/client/get-all-clients/get-all-clients";
import { updateClient } from "./controllers/client/update-client/update-client";
import { deleteClient } from "./controllers/client/delete-client/delete-client";
import { getAddress } from "./controllers/address/get-address/get-address";

export async function appRoutes(app: FastifyInstance) {
    app.get('/get-clients', getAllClients)
    app.get('/client/:clientId', getClient)
    app.post('/client', createClient)
    app.put('/update-client', updateClient)
    app.put('/delete-client', deleteClient)

    app.get('/address/:addressId', getAddress)


}