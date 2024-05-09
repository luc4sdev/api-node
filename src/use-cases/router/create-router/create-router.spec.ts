import { expect, describe, it } from 'vitest'
import { CreateRouterUseCase } from './create-router';
import { InMemoryRoutersRepository } from '@/repositories/in-memory/in-memory-routers-repository';
import { randomUUID } from 'crypto';

let routersRepository: InMemoryRoutersRepository
let sut: CreateRouterUseCase

describe('Create Router Use Case', () => {

    routersRepository = new InMemoryRoutersRepository()
    sut = new CreateRouterUseCase(routersRepository)

    it('should be able to create router', async () => {

        const { router } = await sut.execute({
            ipAddress: '192.168.1.1',
            ipv6Address: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
            brand: 'Huawei',
            model: 'N001',
            clientsIds: [randomUUID(), randomUUID()]
        })

        expect(router.id).toEqual(expect.any(String))
    })
})