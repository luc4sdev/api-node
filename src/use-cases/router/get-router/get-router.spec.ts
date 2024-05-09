import { expect, describe, it } from 'vitest'
import { InMemoryRoutersRepository } from '@/repositories/in-memory/in-memory-routers-repository';
import { randomUUID } from 'crypto';
import { GetRouterUseCase } from './get-router';

let routersRepository: InMemoryRoutersRepository
let sut: GetRouterUseCase

describe('Get Router Use Case', () => {

    routersRepository = new InMemoryRoutersRepository()
    sut = new GetRouterUseCase(routersRepository)

    it('should be able to get router', async () => {

        const createdRouter = await routersRepository.create({
            ipAddress: '192.168.1.1',
            ipv6Address: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
            brand: 'Huawei',
            model: 'N001',
            clientsIds: [randomUUID(), randomUUID()]
        })

        const router = await sut.execute({ routerId: createdRouter.id })

        expect(router.ipAddress).toEqual('192.168.1.1')
    })
})