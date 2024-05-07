import { makeDeleteRouterUseCase } from '@/use-cases/factories/router/make-delete-router-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"

const registerBodySchema = z.object({
    id: z.string().uuid(),
})

export async function deleteRouter(request: FastifyRequest, reply: FastifyReply) {

    const { id } = registerBodySchema.parse(request.body)


    try {

        const deleteRouterUseCase = makeDeleteRouterUseCase()

        await deleteRouterUseCase.execute({ id })

    } catch (err) {
        throw err
    }


    return reply.status(201).send()
}