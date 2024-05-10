
import { Router } from '@prisma/client'
import { getClient } from "@/lib/elasticsearch";
import { randomUUID } from "crypto";
import { RoutersRepository } from '../routers-repository';
import { UpdateRouterUseCaseRequest } from '@/use-cases/router/update-router/update-router';
import { DeleteRouterUseCaseRequest } from '@/use-cases/router/delete-router/delete-router';
import { CreateRouterUseCaseRequest } from '@/use-cases/router/create-router/create-router';

const elasticClient = getClient()

export class ElasticsearchRoutersRepository implements RoutersRepository {

    update(data: UpdateRouterUseCaseRequest): Promise<Router> {
        throw new Error("Method not implemented.");
    }
    delete(data: DeleteRouterUseCaseRequest): Promise<Router> {
        throw new Error("Method not implemented.");
    }


    async findMany(): Promise<any[] | null> {
        const body = await elasticClient.search({
            index: "routers",
            body: {
                query: {
                    bool: {
                        must: [
                            { match: { deleted: false } },
                        ],
                    },
                },
                sort: [{ createdAt: "asc" }],
            },
        });

        return body.hits.hits.map((hit) => hit._source);
    }

    async findById(id: string): Promise<any | null> {
        const body = await elasticClient.search({
            index: "routers",
            body: {
                query: {
                    match: { id: id },
                },
            },
        });

        if (body.hits.hits.length === 0) {
            return null;
        }

        return body.hits.hits[0]._source;
    }



    async create(routerToBeCreated: CreateRouterUseCaseRequest): Promise<any> {

        const routerId = randomUUID()

        const router = await elasticClient.index({
            index: "routers",
            body: {
                id: routerId,
                ipAddress: routerToBeCreated.ipAddress,
                ipv6Address: routerToBeCreated.ipv6Address,
                brand: routerToBeCreated.brand,
                model: routerToBeCreated.model,
                active: false,
                deleted: false,
                clientsIds: routerToBeCreated.clientsIds,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        });


        return router;
    }


    // async update(clientData: UpdateClientUseCaseRequest): Promise<any> {
    //     const { address, ...updatedClient } = clientData;


    //     await elasticClient.update({
    //         index: "address",
    //         id: updatedClient.,
    //         body: {
    //             doc: address,
    //         },
    //     });

    //     await elasticClient.update({
    //         index: "clients",
    //         id: updatedClient.id,
    //         body: {
    //             doc: updatedClient,
    //         },
    //     })

    //     return updatedClient;
    // }



    // async delete(clientData: DeleteClientUseCaseRequest): Promise<any> {
    //     // Exclui o cliente do índice
    //     const body = await elasticClient.update({
    //         index: "address",
    //         id: clientData.id,
    //         body: {
    //             doc: {
    //                 deleted: true
    //             }
    //         },
    //     });

    //     return body.get;
    // }


}