import { ElasticsearchRoutersRepository } from "@/repositories/elasticsearch/elasticsearch-routers-repository"
import { PrismaRoutersRepository } from "@/repositories/prisma/prisma-routers-repository"
import { GetRouterUseCase } from "@/use-cases/router/get-router/get-router"

export function makeGetRouterUseCase() {
    const routersRepository = new PrismaRoutersRepository()
    const elasticRoutersRepository = new ElasticsearchRoutersRepository()

    const useCase = new GetRouterUseCase(routersRepository)
    const elasticUseCase = new GetRouterUseCase(elasticRoutersRepository)

    return [useCase, elasticUseCase]
}