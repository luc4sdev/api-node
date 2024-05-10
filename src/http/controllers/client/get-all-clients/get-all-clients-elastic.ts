import { makeGetAllClientsUseCase } from '@/use-cases/factories/client/make-get-all-clients-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'


export async function getAllClientsElastic(__: FastifyRequest, reply: FastifyReply) {

    const [_, elasticGetClient] = makeGetAllClientsUseCase()

    const clients = await elasticGetClient.execute()

    return reply.status(200).send(clients)
}