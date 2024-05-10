import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository';
import { GetAllClientsUseCase } from '../../client/get-all-clients/get-all-clients';
import { ElasticsearchClientsRepository } from '@/repositories/elasticsearch/elasticsearch-clients-repository';


export function makeGetAllClientsUseCase() {
    const clientsRepository = new PrismaClientsRepository()
    const elasticClientsRepository = new ElasticsearchClientsRepository()

    const useCase = new GetAllClientsUseCase(clientsRepository)
    const elasticUseCase = new GetAllClientsUseCase(elasticClientsRepository)

    return [useCase, elasticUseCase]
}