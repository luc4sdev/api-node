import { makeGetAllRoutersUseCase } from '@/use-cases/factories/router/make-get-all-routers-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'


export async function getAllRoutersElastic(__: FastifyRequest, reply: FastifyReply) {

    const [_, elasticGetAllRouters] = makeGetAllRoutersUseCase()

    const routers = await elasticGetAllRouters.execute()

    return reply.status(200).send(routers)
}