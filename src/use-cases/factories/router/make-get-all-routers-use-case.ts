import { ElasticsearchRoutersRepository } from "@/repositories/elasticsearch/elasticsearch-routers-repository"
import { PrismaRoutersRepository } from "@/repositories/prisma/prisma-routers-repository"
import { GetAllRoutersUseCase } from "@/use-cases/router/get-all-routers/get-all-routers"

export function makeGetAllRoutersUseCase() {
    const routersRepository = new PrismaRoutersRepository()
    const elasticRoutersRepository = new ElasticsearchRoutersRepository()


    const useCase = new GetAllRoutersUseCase(routersRepository)
    const elasticUseCase = new GetAllRoutersUseCase(elasticRoutersRepository)

    return [useCase, elasticUseCase]
}