import { RoutersRepository } from "@/repositories/routers-repository"
import { Router } from "@prisma/client"

export interface DeleteRouterUseCaseRequest {
    id: string
}

interface DeleteRouterUseCaseResponse {
    router: Router
}

export class DeleteRouterUseCase {

    constructor(private routersRepository: RoutersRepository) { }

    async execute({ id }: DeleteRouterUseCaseRequest): Promise<DeleteRouterUseCaseResponse> {


        const router = await this.routersRepository.delete({ id })

        return {
            router
        }

    }
}

