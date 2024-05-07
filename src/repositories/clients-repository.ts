import { CreateClientUseCaseRequest } from "@/use-cases/create-client/create-client";
import { Prisma, Client } from "@prisma/client";

export interface ClientsRepository {
    findById(id: string): Promise<Client | null>
    create(data: CreateClientUseCaseRequest): Promise<Client>
}