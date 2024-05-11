
import { $Enums, Address, Client } from '@prisma/client'
import { ClientsRepository } from "../clients-repository";
import { CreateClientUseCaseRequest } from "@/use-cases/client/create-client/create-client";
import { UpdateClientUseCaseRequest } from "@/use-cases/client/update-client/update-client";
import { DeleteClientUseCaseRequest } from "@/use-cases/client/delete-client/delete-client";
import { getClient } from "@/lib/elasticsearch";
import { randomUUID } from "crypto";

const elasticClient = getClient()

export class ElasticsearchClientsRepository implements ClientsRepository {
    create(data: CreateClientUseCaseRequest): Promise<Client> {
        throw new Error('Method not implemented.');
    }

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


    async findByDocument(document: string): Promise<any | null> {
        const body = await elasticClient.search({
            index: "clients",
            body: {
                query: {
                    match: { document: document },
                },
            },
        });

        if (body.hits.hits.length === 0) {
            return null;
        }

        return body.hits.hits[0]._source;
    }
}