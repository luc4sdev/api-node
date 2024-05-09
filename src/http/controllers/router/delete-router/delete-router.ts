import { makeDeleteRouterUseCase } from '@/use-cases/factories/router/make-delete-router-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"

export const deleteRouterBodySchema = z.object({
    id: z.string().uuid(),
})

export async function deleteRouter(request: FastifyRequest, reply: FastifyReply) {

    const { id } = deleteRouterBodySchema.parse(request.body)


    try {

        const deleteRouterUseCase = makeDeleteRouterUseCase()

        const data = await deleteRouterUseCase.execute({ id })

        return reply.status(200).send(data.router)

    } catch (err) {
        throw err
    }



}