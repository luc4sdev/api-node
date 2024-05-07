import { Prisma, Client } from "@prisma/client";
import { ClientsRepository } from "../clients-repository";
import { randomUUID } from "node:crypto";

export class InMemoryClientsRepository implements ClientsRepository {


    public items: Client[] = []

    async findById(id: string) {
        const client = this.items.find(item => item.id === id)

        if (!client) {
            return null
        }

        return client
    }


    async create(data: Prisma.ClientCreateInput) {
        const user = {
            id: randomUUID(),
            name: data.name,

            created_at: new Date()
        }

        this.items.push(user)

        return user
    }

}