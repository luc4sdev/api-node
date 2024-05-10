import { ElasticsearchAddressRepository } from '@/repositories/elasticsearch/elasticsearch-address-repository';
import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository';
import { GetAddressUseCase } from '@/use-cases/address/get-address/get-address';

export function makeGetAddressUseCase() {
    const addresssRepository = new PrismaAddressRepository()
    const elasticAddressRepository = new ElasticsearchAddressRepository()


    const useCase = new GetAddressUseCase(addresssRepository)
    const elasticUseCase = new GetAddressUseCase(elasticAddressRepository)

    return [useCase, elasticUseCase]
}