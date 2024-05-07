import { ClientsRepository } from "@/repositories/clients-repository";
import { Client } from "@prisma/client";

export interface CreateClientUseCaseRequest {
    name: string
    type: "FISICA" | "JURIDICA"
    document: string
    birthDate: string
    active?: boolean
    address: {
        street: string;
        number: string;
        cep: string;
        neighborhood: string;
        city: string;
    }
}

interface CreateClientUseCaseResponse {
    client: Client
}

export class CreateClientUseCase {

    constructor(private clientsRepository: ClientsRepository) { }

    async execute({ name, type, document, birthDate, active, address }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {


        const client = await this.clientsRepository.create({ name, type, document, birthDate, active, address })

        return {
            client
        }

    }
}

