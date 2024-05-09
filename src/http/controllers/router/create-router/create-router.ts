import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeCreateRouterUseCase } from '@/use-cases/factories/router/make-create-router-use-case';


export const createRouterBodySchema = z.object({
    ipAddress: z.string(),
    ipv6Address: z.string(),
    brand: z.string(),
    model: z.string(),
    clientsIds: z.array(z.string())
})

export async function createRouter(request: FastifyRequest, reply: FastifyReply) {

    const { ipAddress, ipv6Address, brand, model, clientsIds } = createRouterBodySchema.parse(request.body)


    try {

        const createRouterUseCase = makeCreateRouterUseCase()

        const data = await createRouterUseCase.execute({ ipAddress, ipv6Address, brand, model, clientsIds })

        return reply.status(201).send(data.router)

    } catch (err) {
        throw err
    }



}