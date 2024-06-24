import { FastifyInstance } from "fastify";
import { createClient, createClientBodySchema } from "./controllers/client/create-client/create-client";
import { getClient } from "./controllers/client/get-client/get-client";
import { getAllClients } from "./controllers/client/get-all-clients/get-all-clients";
import { updateClient, updateClientBodySchema } from "./controllers/client/update-client/update-client";
import { deleteClient, deleteClientBodySchema } from "./controllers/client/delete-client/delete-client";
import { getAddress } from "./controllers/address/get-address/get-address";
import { createRouter, createRouterBodySchema } from "./controllers/router/create-router/create-router";
import { getRouter } from "./controllers/router/get-router/get-router";
import { getAllRouters } from "./controllers/router/get-all-routers/get-all-routers";
import { updateRouter, updateRouterBodySchema } from "./controllers/router/update-router/update-router";
import { deleteRouter, deleteRouterBodySchema } from "./controllers/router/delete-router/delete-router";
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
                body: createClientBodySchema,
                response: {
                    201: z.object({
                        id: z.string(),
                        name: z.string(),
                        type: z.enum(['FISICA', 'JURIDICA']),
                        document: z.string(),
                        birthDate: z.string(),
                        active: z.boolean().nullable(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                        addressId: z.string(),
                        routerId: z.string().nullable(),
                    })
                }
            },
        }, createClient)

    app.withTypeProvider<ZodTypeProvider>().get(
        '/get-clients',
        {
            schema: {
                tags: ['Clients'],
                summary: 'Get all clients',
                response: {
                    200: z.array(z.object({
                        id: z.string(),
                        name: z.string(),
                        type: z.enum(['FISICA', 'JURIDICA']),
                        document: z.string(),
                        birthDate: z.string(),
                        active: z.boolean().nullable(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                        addressId: z.string(),
                        routerId: z.string().nullable(),
                    }))

                }
            },
        }, getAllClients)

    app.withTypeProvider<ZodTypeProvider>().get(
        '/client/:clientId',
        {
            schema: {
                tags: ['Clients'],
                summary: 'Get client',
                response: {
                    200: z.object({
                        id: z.string(),
                        name: z.string(),
                        type: z.enum(['FISICA', 'JURIDICA']),
                        document: z.string(),
                        birthDate: z.string(),
                        active: z.boolean().nullable(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                        addressId: z.string(),
                        routerId: z.string().nullable(),
                    })
                }
            },
        }, getClient)


    app.withTypeProvider<ZodTypeProvider>().put(
        '/update-client',
        {
            schema: {
                tags: ['Clients'],
                summary: 'Update client',
                body: updateClientBodySchema,
                response: {
                    200: z.object({
                        id: z.string(),
                        name: z.string(),
                        type: z.enum(['FISICA', 'JURIDICA']),
                        document: z.string(),
                        birthDate: z.string(),
                        active: z.boolean().nullable(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                        addressId: z.string(),
                        routerId: z.string().nullable(),
                    })
                }
            },
        }, updateClient)

    app.withTypeProvider<ZodTypeProvider>().put(
        '/delete-client',
        {
            schema: {
                tags: ['Clients'],
                summary: 'Delete client',
                body: deleteClientBodySchema,
                response: {
                    200: z.object({
                        id: z.string(),
                        name: z.string(),
                        type: z.enum(['FISICA', 'JURIDICA']),
                        document: z.string(),
                        birthDate: z.string(),
                        active: z.boolean().nullable(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                        addressId: z.string(),
                        routerId: z.string().nullable(),
                    })
                }
            },
        }, deleteClient)



    // Address route

    app.withTypeProvider<ZodTypeProvider>().get(
        '/address/:addressId',
        {
            schema: {
                tags: ['Address'],
                summary: 'Get address',
                response: {
                    200: z.object({
                        id: z.string(),
                        street: z.string(),
                        number: z.string(),
                        cep: z.string(),
                        neighborhood: z.string(),
                        city: z.string(),
                    })
                }
            },
        }, getAddress)



    // Routers routes

    app.withTypeProvider<ZodTypeProvider>().post(
        '/router',
        {
            schema: {
                tags: ['Routers'],
                summary: 'Create a new router',
                body: createRouterBodySchema,
                response: {
                    201: z.object({
                        id: z.string(),
                        ipAddress: z.string(),
                        ipv6Address: z.string(),
                        brand: z.string(),
                        model: z.string(),
                        active: z.boolean().nullable(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                        clientsIds: z.array(z.string()).optional(),
                    })
                }
            },
        }, createRouter)


    app.withTypeProvider<ZodTypeProvider>().get(
        '/get-routers',
        {
            schema: {
                tags: ['Routers'],
                summary: 'Get all routers',
                response: {
                    200: z.array(z.object({
                        id: z.string(),
                        ipAddress: z.string(),
                        ipv6Address: z.string(),
                        brand: z.string(),
                        model: z.string(),
                        active: z.boolean().nullable(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                        clientsIds: z.array(z.string()).optional(),
                    }))
                }
            },
        }, getAllRouters)


    app.withTypeProvider<ZodTypeProvider>().get(
        '/router/:routerId',
        {
            schema: {
                tags: ['Routers'],
                summary: 'Get router',
                response: {
                    200: z.object({
                        id: z.string(),
                        ipAddress: z.string(),
                        ipv6Address: z.string(),
                        brand: z.string(),
                        model: z.string(),
                        active: z.boolean().nullable(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                        clientsIds: z.array(z.string()).optional(),
                    })
                }
            },
        }, getRouter)


    app.withTypeProvider<ZodTypeProvider>().put(
        '/update-router',
        {
            schema: {
                tags: ['Routers'],
                summary: 'Update router',
                body: updateRouterBodySchema,
                response: {
                    200: z.object({
                        id: z.string(),
                        ipAddress: z.string(),
                        ipv6Address: z.string(),
                        brand: z.string(),
                        model: z.string(),
                        active: z.boolean().nullable(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                        clientsIds: z.array(z.string()).optional(),
                    })
                }
            },
        }, updateRouter)

    app.withTypeProvider<ZodTypeProvider>().put(
        '/delete-router',
        {
            schema: {
                tags: ['Routers'],
                summary: 'Delete router',
                body: deleteRouterBodySchema,
                response: {
                    200: z.object({
                        id: z.string(),
                        ipAddress: z.string(),
                        ipv6Address: z.string(),
                        brand: z.string(),
                        model: z.string(),
                        active: z.boolean().nullable(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                        clientsIds: z.array(z.string()).optional(),
                    })
                }
            },
        }, deleteRouter)

}