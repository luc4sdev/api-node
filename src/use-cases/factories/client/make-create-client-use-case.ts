import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository"
import { CreateClientUseCase } from "../../client/create-client/create-client"
import { ElasticsearchClientsRepository } from "@/repositories/elasticsearch/elasticsearch-clients-repository"

export function makeCreateClientUseCase() {
    const clientsRepository = new PrismaClientsRepository()
    const elasticClientsRepository = new ElasticsearchClientsRepository()

    const registerUseCase = new CreateClientUseCase(clientsRepository)
    const registerElasticUseCase = new CreateClientUseCase(elasticClientsRepository)

    return [registerUseCase, registerElasticUseCase]
}