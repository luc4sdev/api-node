import { makeUpdateRouterUseCase } from '@/use-cases/factories/router/make-update-router-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"

const registerBodySchema = z.object({
    id: z.string().uuid(),
    ipAddress: z.string().optional(),
    ipv6Address: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    active: z.boolean().optional(),
    clientsIds: z.array(z.string()).optional()
})

export async function updateRouter(request: FastifyRequest, reply: FastifyReply) {

    const { id, ipAddress, ipv6Address, brand, model, active, clientsIds } = registerBodySchema.parse(request.body)


    try {

        const updateRouterUseCase = makeUpdateRouterUseCase()

        await updateRouterUseCase.execute({ id, ipAddress, ipv6Address, brand, model, active, clientsIds })

    } catch (err) {
        throw err
    }


    return reply.status(201).send()
}