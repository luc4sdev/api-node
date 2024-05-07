import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateClientUseCase } from '@/use-cases/factories/make-create-client-use-case';
import { z } from "zod"

export async function createClient(request: FastifyRequest, reply: FastifyReply) {

    const AddressSchema = z.object({
        street: z.string(),
        number: z.string(),
        cep: z.string(),
        neighborhood: z.string(),
        city: z.string(),
    });

    const RouterSchema = z.object({
        ipAddress: z.string(),
        ipv6Address: z.string(),
        brand: z.string(),
        model: z.string(),
    });

    const registerBodySchema = z.object({
        name: z.string(),
        type: z.enum(['CPF', 'CNPJ']),
        document: z.string(),
        birthDate: z.string(),
        address: AddressSchema,
        router: RouterSchema,
    })

    const { name, type, document, birthDate, address, router } = registerBodySchema.parse(request.body)


    try {

        const createClientUseCase = makeCreateClientUseCase()

        await createClientUseCase.execute({ name, type, document, birthDate, address, router })

    } catch (err) {
        throw err
    }


    return reply.status(201).send()
}