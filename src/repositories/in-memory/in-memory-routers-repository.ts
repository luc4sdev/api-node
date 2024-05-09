import { RouterWithClients } from '@/use-cases/router/get-router/get-router';
import { RoutersRepository } from '../routers-repository';
import { CreateRouterUseCaseRequest } from '@/use-cases/router/create-router/create-router';
import { UpdateRouterUseCaseRequest } from '@/use-cases/router/update-router/update-router';
import { DeleteRouterUseCaseRequest } from '@/use-cases/router/delete-router/delete-router';
import { randomUUID } from 'crypto';

export class InMemoryRoutersRepository implements RoutersRepository {
    private items: RouterWithClients[] = [];

    async findMany(): Promise<RouterWithClients[] | null> {
        return this.items.filter(router => !router.deleted);
    }

    async findById(id: string): Promise<RouterWithClients | null> {
        return this.items.find(router => router.id === id) || null;
    }

    async create(routerToBeCreated: CreateRouterUseCaseRequest): Promise<RouterWithClients> {
        const router: RouterWithClients = {
            id: randomUUID(),
            ipAddress: routerToBeCreated.ipAddress,
            ipv6Address: routerToBeCreated.ipv6Address,
            brand: routerToBeCreated.brand,
            model: routerToBeCreated.model,
            active: (routerToBeCreated.clientsIds && routerToBeCreated.clientsIds.length > 0) ? true : false,
            clientsIds: routerToBeCreated.clientsIds || [],
            deleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.items.push(router);
        return router;
    }

    async update(routerToBeUpdated: UpdateRouterUseCaseRequest): Promise<RouterWithClients> {
        const index = this.items.findIndex(router => router.id === routerToBeUpdated.id);

        const updatedRouter = {
            ...this.items[index],
            ...routerToBeUpdated,
            active: (routerToBeUpdated.clientsIds && routerToBeUpdated.clientsIds.length > 0) ? true : false,
            clientsIds: routerToBeUpdated.clientsIds || [],
            updatedAt: new Date(),
        };
        this.items[index] = updatedRouter;
        return updatedRouter;
    }

    async delete({ id }: DeleteRouterUseCaseRequest): Promise<RouterWithClients> {
        const index = this.items.findIndex(router => router.id === id);

        const deletedRouter = {
            ...this.items[index],
            deleted: true,
            active: false,
            updatedAt: new Date(),
        };
        this.items[index] = deletedRouter;
        return deletedRouter;
    }
}
