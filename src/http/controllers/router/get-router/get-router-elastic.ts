import { makeGetRouterUseCase } from '@/use-cases/factories/router/make-get-router-use-case';
import { FastifyReply, FastifyRequest } from 'fastify'

interface Request {
    routerId: string
}
export async function getRouterElastic(request: FastifyRequest, reply: FastifyReply) {
    const req = await request.params as Request;
    const routerId = req.routerId

    const [_, elasticGetRouter] = makeGetRouterUseCase()

    const router = await elasticGetRouter.execute({
        routerId
    })

    return reply.status(200).send(router)
}