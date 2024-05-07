import { prisma } from "@/lib/prisma";
import { Client, Prisma } from '@prisma/client'
import { ClientsRepository } from "../clients-repository";
import { CreateClientUseCaseRequest } from "@/use-cases/create-client/create-client";


export class PrismaClientsRepository implements ClientsRepository {
    async findById(id: string): Promise<Client | null> {
        const client = await prisma.client.findUnique({
            where: {
                id,
            },
        })

        return client
    }


    async create(d: CreateClientUseCaseRequest) {
        const client = await prisma.client.create({
            data: {
                name: d.name,
                type: d.type,
                document: d.document,
                birthDate: d.birthDate,
                address: {
                    create: {

                    }
                }
            }
        })

        return client
    }


}