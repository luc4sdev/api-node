import { makeDeleteClientUseCase } from '@/use-cases/factories/client/make-delete-client-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"


export const deleteClientBodySchema = z.object({
    id: z.string().uuid(),
})

export async function deleteClient(request: FastifyRequest, reply: FastifyReply) {

    const { id } = deleteClientBodySchema.parse(request.body)


    try {

        const deleteClientUseCase = makeDeleteClientUseCase()

        await deleteClientUseCase.execute({ id })

    } catch (err) {
        throw err
    }


    return reply.status(201).send()
}