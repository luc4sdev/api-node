import { Address } from '@prisma/client'
import { AddressRepository } from "../address-repository";


export class InMemoryAddressRepository implements AddressRepository {
    private items: Address[] = [];

    async findById(id: string): Promise<Address | null> {
        return this.items.find(address => address.id === id) || null;
    }

}