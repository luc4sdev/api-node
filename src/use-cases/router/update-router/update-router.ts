import { RoutersRepository } from "@/repositories/routers-repository"
import { Router } from "@prisma/client"


export interface UpdateRouterUseCaseRequest {
    id: string
    ipAddress?: string
    ipv6Address?: string
    brand?: string
    model?: string
    active?: boolean
    clientsIds?: string[]
}

interface UpdateRouterUseCaseResponse {
    router: Router
}

export class UpdateRouterUseCase {

    constructor(private routersRepository: RoutersRepository) { }

    async execute({ id, ipAddress, ipv6Address, brand, model, active, clientsIds }: UpdateRouterUseCaseRequest): Promise<UpdateRouterUseCaseResponse> {


        const router = await this.routersRepository.update({ id, ipAddress, ipv6Address, brand, model, active, clientsIds })

        return {
            router
        }

    }
}

