import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository';
import { GetClientUseCase } from '../../client/get-client/get-client';
import { ElasticsearchClientsRepository } from '@/repositories/elasticsearch/elasticsearch-clients-repository';


export function makeGetClientUseCase() {
    const clientsRepository = new PrismaClientsRepository()
    const elasticClientsRepository = new ElasticsearchClientsRepository()


    const useCase = new GetClientUseCase(clientsRepository)
    const elasticUseCase = new GetClientUseCase(elasticClientsRepository)

    return [useCase, elasticUseCase]
}