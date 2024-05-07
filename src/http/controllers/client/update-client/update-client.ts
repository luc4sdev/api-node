import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeUpdateClientUseCase } from '@/use-cases/factories/client/make-update-client-use-case';

export async function updateClient(request: FastifyRequest, reply: FastifyReply) {

    const AddressSchema = z.object({
        street: z.string().optional(),
        number: z.string().optional(),
        cep: z.string().optional(),
        neighborhood: z.string().optional(),
        city: z.string().optional(),
    });

    const registerBodySchema = z.object({
        id: z.string().uuid(),
        name: z.string().optional(),
        type: z.enum(['FISICA', 'JURIDICA']).optional(),
        document: z.string().optional(),
        birthDate: z.string().optional(),
        address: AddressSchema,
        active: z.boolean().optional()
    })

    const { id, name, type, document, birthDate, address, active } = registerBodySchema.parse(request.body)


    try {

        const updateClientUseCase = makeUpdateClientUseCase()

        await updateClientUseCase.execute({ id, name, type, document, birthDate, address, active })

    } catch (err) {
        throw err
    }


    return reply.status(201).send()
}