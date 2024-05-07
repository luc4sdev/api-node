import { Router } from '@prisma/client';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { RoutersRepository } from '@/repositories/routers-repository';

export interface RouterWithClients extends Router {
    clientsIds?: string[]
}

export interface GetAllRoutersUseCaseResponse {
    routers: RouterWithClients[]
}


export class GetAllRoutersUseCase {
    constructor(
        private routersRepository: RoutersRepository
    ) { }

    async execute(): Promise<GetAllRoutersUseCaseResponse> {
        const routers = await this.routersRepository.findMany()

        if (!routers) {
            throw new ResourceNotFoundError()
        }

        return {
            routers
        }
    }
}