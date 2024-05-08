import { Router } from '@prisma/client';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { RoutersRepository } from '@/repositories/routers-repository';

interface GetRouterUseCaseRequest {
    routerId: string;
}

export interface RouterWithClients extends Router {
    clientsIds?: string[]
}

export type GetRouterUseCaseResponse = RouterWithClients


export class GetRouterUseCase {
    constructor(
        private routersRepository: RoutersRepository
    ) { }

    async execute({ routerId }: GetRouterUseCaseRequest): Promise<GetRouterUseCaseResponse> {
        const router = await this.routersRepository.findById(routerId)

        if (!router) {
            throw new ResourceNotFoundError()
        }

        return router
    }
}