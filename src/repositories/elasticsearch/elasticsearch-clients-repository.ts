
import { Address, Client } from '@prisma/client'
import { ClientsRepository } from "../clients-repository";
import { CreateClientUseCaseRequest } from "@/use-cases/client/create-client/create-client";
import { UpdateClientUseCaseRequest } from "@/use-cases/client/update-client/update-client";
import { DeleteClientUseCaseRequest } from "@/use-cases/client/delete-client/delete-client";
import { getClient } from "@/lib/elasticsearch";
import { randomUUID } from "crypto";

const elasticClient = getClient()

export class ElasticsearchClientsRepository implements ClientsRepository {
    update(data: UpdateClientUseCaseRequest): Promise<Client> {
        throw new Error("Method not implemented.");
    }
    delete(data: DeleteClientUseCaseRequest): Promise<Client> {
        throw new Error("Method not implemented.");
    }


    async findMany(): Promise<any[] | null> {
        const body = await elasticClient.search({
            index: "clients",
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
            index: "clients",
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



    async create(clientToBeCreated: CreateClientUseCaseRequest): Promise<any> {

        const query = {
            index: "address",
            body: {
                query: {
                    bool: {
                        must: [
                            { match: { street: { query: clientToBeCreated.address.street, operator: "and" } } },
                            { match: { number: { query: clientToBeCreated.address.number, operator: "and" } } },
                            { match: { cep: { query: clientToBeCreated.address.cep, operator: "and" } } },
                            { match: { neighborhood: { query: clientToBeCreated.address.neighborhood, operator: "and" } } },
                            { match: { city: { query: clientToBeCreated.address.city, operator: "and" } } },
                        ],
                    },
                },
            },
        };

        const addressExist = await elasticClient.search(query);
        const firstAddress = addressExist.hits.hits[0]

        if (!firstAddress) {

            const addressId = randomUUID()

            await elasticClient.index({
                index: "address",
                body: {
                    id: addressId,
                    street: clientToBeCreated.address.street,
                    number: clientToBeCreated.address.number,
                    cep: clientToBeCreated.address.cep,
                    neighborhood: clientToBeCreated.address.neighborhood,
                    city: clientToBeCreated.address.city
                },
            });

            const client = await elasticClient.index({
                index: "clients",
                body: {
                    id: randomUUID(),
                    name: clientToBeCreated.name,
                    type: clientToBeCreated.type,
                    document: clientToBeCreated.document,
                    birthDate: clientToBeCreated.birthDate,
                    active: false,
                    deleted: false,
                    addressId: addressId,
                    routerId: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
            });

            return client
        }


        console.log(firstAddress._source)
        const address: Address = firstAddress._source as Address;
        const client = await elasticClient.index({
            index: "clients",
            body: {
                id: randomUUID(),
                name: clientToBeCreated.name,
                type: clientToBeCreated.type,
                document: clientToBeCreated.document,
                birthDate: clientToBeCreated.birthDate,
                active: false,
                deleted: false,
                addressId: address.id,
                routerId: null,
                createdAt: new Date(),
                updatedAt: new Date()

            },
        });

        return client
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