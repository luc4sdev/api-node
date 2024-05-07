import { makeGetRouterUseCase } from '@/use-cases/factories/router/make-get-router-use-case';
import { FastifyReply, FastifyRequest } from 'fastify'

interface Request {
    routerId: string
}
export async function getRouter(request: FastifyRequest, reply: FastifyReply) {
    const req = await request.params as Request;
    const routerId = req.routerId

    const getRouter = makeGetRouterUseCase()

    const { router } = await getRouter.execute({
        routerId
    })

    return reply.status(200).send({ router })
}