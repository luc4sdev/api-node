import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository';
import { GetAddressUseCase } from '@/use-cases/address/get-address/get-address';

export function makeGetAddressUseCase() {
    const addresssRepository = new PrismaAddressRepository()
    const useCase = new GetAddressUseCase(addresssRepository)

    return useCase
}