import { Address } from "@prisma/client";

export interface AddressRepository {
    findById(id: string): Promise<Address | null>
}