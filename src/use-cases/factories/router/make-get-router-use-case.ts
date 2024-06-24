import { PrismaRoutersRepository } from "@/repositories/prisma/prisma-routers-repository"
import { GetRouterUseCase } from "@/use-cases/router/get-router/get-router"

export function makeGetRouterUseCase() {
    const routersRepository = new PrismaRoutersRepository()

    const useCase = new GetRouterUseCase(routersRepository)

    return useCase
}