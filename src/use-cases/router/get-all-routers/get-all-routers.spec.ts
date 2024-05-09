import { expect, describe, it } from 'vitest'
import { InMemoryRoutersRepository } from '@/repositories/in-memory/in-memory-routers-repository';
import { randomUUID } from 'crypto';
import { GetAllRoutersUseCase } from './get-all-routers';

let routersRepository: InMemoryRoutersRepository
let sut: GetAllRoutersUseCase

describe('Get All Routers Use Case', () => {

    routersRepository = new InMemoryRoutersRepository()
    sut = new GetAllRoutersUseCase(routersRepository)

    it('should be able to get all routers', async () => {

        await routersRepository.create({
            ipAddress: '192.168.1.1',
            ipv6Address: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
            brand: 'Huawei',
            model: 'N001',
            clientsIds: [randomUUID(), randomUUID()]
        })

        await routersRepository.create({
            ipAddress: '192.168.1.1',
            ipv6Address: '0000:0000:0000:0000',
            brand: 'D-Link',
            model: 'v1',
            clientsIds: [randomUUID(), randomUUID()]
        })

        const routers = await sut.execute()

        expect(routers).length(2)
    })
})