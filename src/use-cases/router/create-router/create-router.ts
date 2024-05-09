import { RoutersRepository } from "@/repositories/routers-repository";
import { Router } from "@prisma/client";

export interface CreateRouterUseCaseRequest {
    ipAddress: string
    ipv6Address: string
    brand: string
    model: string
    clientsIds?: string[]
}

interface CreateRouterUseCaseResponse {
    router: Router
}

export class CreateRouterUseCase {

    constructor(private routersRepository: RoutersRepository) { }

    async execute({ ipAddress, ipv6Address, brand, model, clientsIds }: CreateRouterUseCaseRequest): Promise<CreateRouterUseCaseResponse> {


        const router = await this.routersRepository.create({ ipAddress, ipv6Address, brand, model, clientsIds })

        return {
            router
        }

    }
}

