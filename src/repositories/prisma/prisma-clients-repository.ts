import { prisma } from "@/lib/prisma";
import { Client } from '@prisma/client'
import { ClientsRepository } from "../clients-repository";
import { CreateClientUseCaseRequest } from "@/use-cases/client/create-client/create-client";
import { UpdateClientUseCaseRequest } from "@/use-cases/client/update-client/update-client";


export class PrismaClientsRepository implements ClientsRepository {

    async findMany(): Promise<Client[] | null> {
        const clients = await prisma.client.findMany({
            where: {
                deleted: false
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return clients
    }

    async findById(id: string): Promise<Client | null> {
        const client = await prisma.client.findUnique({
            where: {
                id,
            },
        })

        return client
    }


    async create(clientToBeCreated: CreateClientUseCaseRequest) {

        const addressExist = await prisma.address.findFirst({
            where: {
                AND: [
                    { street: clientToBeCreated.address.street },
                    { number: clientToBeCreated.address.number },
                    { cep: clientToBeCreated.address.cep },
                    { neighborhood: clientToBeCreated.address.neighborhood },
                    { city: clientToBeCreated.address.city },
                ],
            }
        })

        if (!addressExist) {
            const address = await prisma.address.create({
                data: clientToBeCreated.address
            })

            const client = await prisma.client.create({
                data: {
                    name: clientToBeCreated.name,
                    type: clientToBeCreated.type,
                    document: clientToBeCreated.document,
                    birthDate: clientToBeCreated.birthDate,
                    active: clientToBeCreated.active,
                    addressId: address.id,
                }
            })
            return client
        }


        const client = await prisma.client.create({
            data: {
                name: clientToBeCreated.name,
                type: clientToBeCreated.type,
                document: clientToBeCreated.document,
                birthDate: clientToBeCreated.birthDate,
                active: clientToBeCreated.active,
                addressId: addressExist.id,
            }
        })

        return client
    }


    async update(clientToBeUpdated: UpdateClientUseCaseRequest) {

        const clientExists = await prisma.client.findUnique({
            where: {
                id: clientToBeUpdated.id,
            },
        })



        await prisma.address.update({
            where: {
                id: clientExists?.addressId
            },
            data: {
                street: clientToBeUpdated.address?.street,
                number: clientToBeUpdated.address?.number,
                cep: clientToBeUpdated.address?.cep,
                neighborhood: clientToBeUpdated.address?.neighborhood,
                city: clientToBeUpdated.address?.city,
            }
        })

        const client = await prisma.client.update({
            where: {
                id: clientToBeUpdated.id
            },
            data: {
                name: clientToBeUpdated.name,
                type: clientToBeUpdated.type,
                document: clientToBeUpdated.document,
                birthDate: clientToBeUpdated.birthDate,
                active: clientToBeUpdated.active,
                addressId: clientExists?.addressId,
            }
        })

        return client

    }


    async delete(clientToBeDeleted: UpdateClientUseCaseRequest) {

        const client = await prisma.client.update({
            where: {
                id: clientToBeDeleted.id
            },
            data: {
                deleted: true
            }
        })

        return client
    }


}