import { ElasticsearchRoutersRepository } from "@/repositories/elasticsearch/elasticsearch-routers-repository"
import { PrismaRoutersRepository } from "@/repositories/prisma/prisma-routers-repository"
import { CreateRouterUseCase } from "@/use-cases/router/create-router/create-router"

export function makeCreateRouterUseCase() {
    const routersRepository = new PrismaRoutersRepository()
    const elasticRoutersRepository = new ElasticsearchRoutersRepository()

    const registerUseCase = new CreateRouterUseCase(routersRepository)
    const registerElasticUseCase = new CreateRouterUseCase(elasticRoutersRepository)

    return [registerUseCase, registerElasticUseCase]
}