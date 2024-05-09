import { RouterWithClients } from './../../use-cases/router/get-router/get-router';
import { prisma } from "@/lib/prisma";
import { RoutersRepository } from "../routers-repository";
import { CreateRouterUseCaseRequest } from "@/use-cases/router/create-router/create-router";
import { UpdateRouterUseCaseRequest } from '@/use-cases/router/update-router/update-router';


export class PrismaRoutersRepository implements RoutersRepository {

    async findMany(): Promise<RouterWithClients[] | null> {
        const routers = await prisma.router.findMany({
            where: {
                deleted: false
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        if (!routers) {
            return null;
        }

        const routersWithClients: RouterWithClients[] = await Promise.all(routers.map(async router => {
            const clients = await prisma.client.findMany({
                where: {
                    routerId: router.id,
                },
            });

            return {
                ...router,
                clientsIds: clients.map(client => client.id),
            };
        }));

        return routersWithClients
    }

    async findById(id: string): Promise<RouterWithClients | null> {
        const router = await prisma.router.findUnique({
            where: {
                id,
            },
        })
        if (!router) {
            return null
        }

        const clients = await prisma.client.findMany({
            where: {
                routerId: router?.id
            }
        })

        const routerWithClients = {
            ...router,
            clientsIds: clients.map(client => client.id)
        }

        return routerWithClients
    }


    async create(routerToBeCreated: CreateRouterUseCaseRequest) {


        const router = await prisma.router.create({
            data: {
                ipAddress: routerToBeCreated.ipAddress,
                ipv6Address: routerToBeCreated.ipv6Address,
                brand: routerToBeCreated.brand,
                model: routerToBeCreated.model,
                active: routerToBeCreated.active,
                client: {
                    connect: routerToBeCreated.clientsIds?.map(id => ({ id })) ?? []
                }
            }
        })

        return router
    }


    async update(routerToBeUpdated: UpdateRouterUseCaseRequest) {


        const router = await prisma.router.update({
            where: {
                id: routerToBeUpdated.id
            },
            data: {
                ipAddress: routerToBeUpdated.ipAddress,
                ipv6Address: routerToBeUpdated.ipv6Address,
                brand: routerToBeUpdated.brand,
                model: routerToBeUpdated.model,
                active: routerToBeUpdated.active,
                client: {
                    set: routerToBeUpdated.clientsIds?.map(id => ({ id })) ?? []
                }
            }
        })

        await prisma.client.updateMany({
            where: {
                id: {
                    in: routerToBeUpdated.clientsIds
                }
            },
            data: {
                routerId: routerToBeUpdated.id
            }
        });

        return router
    }


    async delete(routerToBeDeleted: UpdateRouterUseCaseRequest) {

        const router = await prisma.router.update({
            where: {
                id: routerToBeDeleted.id
            },
            data: {
                deleted: true
            }
        })

        return router
    }


}