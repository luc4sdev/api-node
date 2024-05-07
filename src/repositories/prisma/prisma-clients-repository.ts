import { prisma } from "@/lib/prisma";
import { Address, Client, Prisma } from '@prisma/client'
import { ClientsRepository } from "../clients-repository";
import { CreateClientUseCaseRequest } from "@/use-cases/client/create-client/create-client";


export class PrismaClientsRepository implements ClientsRepository {
    async findById(id: string): Promise<Client | null> {
        const client = await prisma.client.findUnique({
            where: {
                id,
            },
        })

        return client
    }


    async create(clientToBeCreated: CreateClientUseCaseRequest) {

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


}