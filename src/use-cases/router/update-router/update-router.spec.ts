import { expect, describe, it } from 'vitest'
import { InMemoryRoutersRepository } from '@/repositories/in-memory/in-memory-routers-repository';
import { randomUUID } from 'crypto';
import { UpdateRouterUseCase } from './update-router';

let routersRepository: InMemoryRoutersRepository
let sut: UpdateRouterUseCase

describe('Update Router Use Case', () => {

    routersRepository = new InMemoryRoutersRepository()
    sut = new UpdateRouterUseCase(routersRepository)

    it('should be able to update router', async () => {

        const router = await routersRepository.create({
            ipAddress: '192.168.1.1',
            ipv6Address: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
            brand: 'Huawei',
            model: 'N001',
            clientsIds: [randomUUID(), randomUUID()]
        })

        const newRouterData = {
            id: router.id,
            ipAddress: '192.168.1.1',
            ipv6Address: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
            brand: 'D-Link',
            model: 'N001',
            clientsIds: [randomUUID()]
        }

        const data = await sut.execute(newRouterData)

        expect(data.router.brand).toEqual('D-Link')
    })
})