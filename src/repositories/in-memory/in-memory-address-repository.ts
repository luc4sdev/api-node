import { Address } from '@prisma/client'
import { AddressRepository } from "../address-repository";
import { randomUUID } from 'crypto';


export class InMemoryAddressRepository implements AddressRepository {
    private items: Address[] = [];

    async findById(id: string): Promise<Address | null> {
        return this.items.find(address => address.id === id) || null;
    }

    async create(data: { street: string, number: string, cep: string, neighborhood: string, city: string }) {

        const address = {
            id: randomUUID(),
            street: data.street,
            number: data.number,
            cep: data.cep,
            neighborhood: data.neighborhood,
            city: data.city,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.items.push(address)

        return address
    }

}