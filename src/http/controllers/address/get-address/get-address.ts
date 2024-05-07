import { makeGetAddressUseCase } from '@/use-cases/factories/address/make-get-address-use-case';
import { FastifyReply, FastifyRequest } from 'fastify'

interface Request {
    addressId: string
}
export async function getAddress(request: FastifyRequest, reply: FastifyReply) {
    const req = await request.params as Request;
    const addressId = req.addressId

    const getAddress = makeGetAddressUseCase()

    const { address } = await getAddress.execute({
        addressId
    })

    return reply.status(200).send({ address })
}