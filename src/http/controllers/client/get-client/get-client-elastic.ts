
import { makeGetClientUseCase } from '@/use-cases/factories/client/make-get-client-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

interface Request {
    clientId: string
}
export async function getClientElastic(request: FastifyRequest, reply: FastifyReply) {
    const req = await request.params as Request;
    const clientId = req.clientId

    const [_, elasticGetClient] = makeGetClientUseCase()

    const elastic = await elasticGetClient.execute({
        clientId
    })

    return reply.status(200).send(elastic)
}