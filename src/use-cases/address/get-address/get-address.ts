import { Address } from '@prisma/client';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { AddressRepository } from '@/repositories/address-repository';

interface GetAddressUseCaseRequest {
    addressId: string;
}

interface GetAddressUseCaseResponse {
    address: Address
}


export class GetAddressUseCase {
    constructor(
        private addressRepository: AddressRepository
    ) { }

    async execute({ addressId }: GetAddressUseCaseRequest): Promise<GetAddressUseCaseResponse> {
        const address = await this.addressRepository.findById(addressId)

        if (!address) {
            throw new ResourceNotFoundError()
        }

        return {
            address
        }
    }
}