import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";

describe('Get Router (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should be able to get router', async () => {

        const clientData = await request(app.server).post('/client').send({
            name: "John Doe",
            type: "FISICA",
            document: "71012312303",
            birthDate: "13/10/2002",
            address: {
                street: "street 3",
                number: "11",
                cep: "74000",
                neighborhood: "bairro ABC",
                city: "Goiânia",
            }
        })

        const routerData = await request(app.server).post('/router').send({
            ipAddress: "192.168.0.1",
            ipv6Address: "200:200:200:200",
            brand: "Huawei",
            model: "v5",
            active: false,
            clientsIds: [
                clientData.body.id
            ]
        })

        const response = await request(app.server).get(`/router/${routerData.body.id}`).send()

        expect(response.statusCode).toEqual(200)
    })
})