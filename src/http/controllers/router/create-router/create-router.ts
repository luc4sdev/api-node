import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeCreateRouterUseCase } from '@/use-cases/factories/router/make-create-router-use-case';


const registerBodySchema = z.object({
    ipAddress: z.string(),
    ipv6Address: z.string(),
    brand: z.string(),
    model: z.string(),
    active: z.boolean(),
    clientsIds: z.array(z.string())
})

export async function createRouter(request: FastifyRequest, reply: FastifyReply) {

    const { ipAddress, ipv6Address, brand, model, active, clientsIds } = registerBodySchema.parse(request.body)


    try {

        const createRouterUseCase = makeCreateRouterUseCase()

        await createRouterUseCase.execute({ ipAddress, ipv6Address, brand, model, active, clientsIds })

    } catch (err) {
        throw err
    }


    return reply.status(201).send()
}