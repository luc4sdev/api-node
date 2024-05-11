import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
    await prisma.client.deleteMany()
    await prisma.address.deleteMany()
    await prisma.router.deleteMany()

    const address = await prisma.address.create({
        data: {
            street: 'Rua rit 1',
            cep: '74445190',
            number: '52',
            neighborhood: 'Vila Abc',
            city: 'Goiânia',
        }
    })

    const client1 = await prisma.client.create({
        data: {
            name: 'John Doe',
            type: 'FISICA',
            document: '111.111.111-01',
            birthDate: '10-12-1992',
            addressId: address.id
        }
    })

    const client2 = await prisma.client.create({
        data: {
            name: faker.person.fullName(),
            type: 'FISICA',
            document: '222.222.222-02',
            birthDate: '10-12-1992',
            addressId: address.id
        }
    })

    const client3 = await prisma.client.create({
        data: {
            name: faker.person.fullName(),
            type: 'JURIDICA',
            document: '333.333.333-03',
            birthDate: '03-01-2002',
            addressId: address.id
        }
    })

    const clientIds = []
    clientIds.push(client1.id)
    clientIds.push(client2.id)
    clientIds.push(client3.id)

    await prisma.router.create({
        data: {
            ipAddress: '192.168.1.1',
            ipv6Address: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
            brand: 'Huawei',
            model: 'NE8000'
        }
    })
}

seed().then(() => {
    console.log('Database seeded!')
})