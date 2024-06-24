import { makeGetAllRoutersUseCase } from '@/use-cases/factories/router/make-get-all-routers-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'


export async function getAllRouters(__: FastifyRequest, reply: FastifyReply) {

    const getAllRouters = makeGetAllRoutersUseCase()

    const routers = await getAllRouters.execute()

    return reply.status(200).send(routers)
}