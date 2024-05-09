import { expect, describe, it } from 'vitest'
import { GetAddressUseCase } from './get-address';
import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-address-repository';


let addressRepository: InMemoryAddressRepository
let sut: GetAddressUseCase

describe('Get Address Use Case', () => {

    addressRepository = new InMemoryAddressRepository()
    sut = new GetAddressUseCase(addressRepository)

    it('should be able to get address', async () => {

        const createdAddress = await addressRepository.create({
            street: 'Rua 1',
            number: '12',
            cep: '74000000',
            neighborhood: 'Bairro ABC',
            city: 'New York'
        })

        const address = await sut.execute({ addressId: createdAddress.id })

        expect(address.cep).toEqual('74000000')
    })
})