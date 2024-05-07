import { makeGetAllRoutersUseCase } from '@/use-cases/factories/router/make-get-all-routers-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'


export async function getAllRouters(_: FastifyRequest, reply: FastifyReply) {

    const getClient = makeGetAllRoutersUseCase()

    const routers = await getClient.execute()

    return reply.status(200).send(routers)
}