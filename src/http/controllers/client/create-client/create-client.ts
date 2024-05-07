import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateClientUseCase } from '@/use-cases/factories/client/make-create-client-use-case';
import { z } from "zod"

const AddressSchema = z.object({
    street: z.string(),
    number: z.string(),
    cep: z.string(),
    neighborhood: z.string(),
    city: z.string(),
});

export const registerBodySchema = z.object({
    name: z.string(),
    type: z.enum(['FISICA', 'JURIDICA']),
    document: z.string(),
    birthDate: z.string(),
    address: AddressSchema,
    active: z.boolean()
})

export async function createClient(request: FastifyRequest, reply: FastifyReply) {

    const { name, type, document, birthDate, address, active } = registerBodySchema.parse(request.body)


    try {

        const createClientUseCase = makeCreateClientUseCase()

        await createClientUseCase.execute({ name, type, document, birthDate, address, active })

    } catch (err) {
        throw err
    }


    return reply.status(201).send()
}