import { expect, describe, it } from 'vitest'
import { InMemoryRoutersRepository } from '@/repositories/in-memory/in-memory-routers-repository';
import { randomUUID } from 'crypto';
import { DeleteRouterUseCase } from './delete-router';

let routersRepository: InMemoryRoutersRepository
let sut: DeleteRouterUseCase

describe('Delete Router Use Case', () => {

    routersRepository = new InMemoryRoutersRepository()
    sut = new DeleteRouterUseCase(routersRepository)

    it('should be able to delete router', async () => {

        const { router } = await sut.execute({ id: randomUUID() })

        expect(router.deleted).toEqual(true)
    })
})