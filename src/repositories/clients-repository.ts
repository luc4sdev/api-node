import { CreateClientUseCaseRequest } from "@/use-cases/client/create-client/create-client";
import { Prisma, Client, Address } from "@prisma/client";

export interface ClientsRepository {
    findById(id: string): Promise<Client | null>
    create(data: CreateClientUseCaseRequest): Promise<Client>
}