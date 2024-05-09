import { makeUpdateRouterUseCase } from '@/use-cases/factories/router/make-update-router-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"

export const updateRouterBodySchema = z.object({
    id: z.string().uuid(),
    ipAddress: z.string().optional(),
    ipv6Address: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    clientsIds: z.array(z.string()).optional()
})

export async function updateRouter(request: FastifyRequest, reply: FastifyReply) {

    const { id, ipAddress, ipv6Address, brand, model, clientsIds } = updateRouterBodySchema.parse(request.body)


    try {

        const updateRouterUseCase = makeUpdateRouterUseCase()

        const data = await updateRouterUseCase.execute({ id, ipAddress, ipv6Address, brand, model, clientsIds })

        return reply.status(200).send(data.router)

    } catch (err) {
        throw err
    }



}