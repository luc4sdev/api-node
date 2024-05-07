import { ClientsRepository } from "@/repositories/clients-repository";
import { $Enums, Address, Client, Prisma, Router } from "@prisma/client";

export interface CreateClientUseCaseRequest {
    name: string
    type: $Enums.ClientType
    document: string
    birthDate: string
    address?: {
        street: string;
        number: string;
        cep: string;
        neighborhood: string;
        city: string;
    }
    router?: {
        ipAddress: string;
        ipv6Address: string;
        brand: string;
        model: string;
    }
}

interface CreateClientUseCaseResponse {
    client: Client
}

export class CreateClientUseCase {

    constructor(private clientsRepository: ClientsRepository) { }

    async execute({ name, type, document, birthDate, address, router }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {


        const client = await this.clientsRepository.create({ name, type, document, birthDate, address, router })

        return {
            client
        }

    }
}

