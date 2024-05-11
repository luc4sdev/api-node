import { PrismaRoutersRepository } from "@/repositories/prisma/prisma-routers-repository"
import { CreateRouterUseCase } from "@/use-cases/router/create-router/create-router"

export function makeCreateRouterUseCase() {
    const routersRepository = new PrismaRoutersRepository()

    const registerUseCase = new CreateRouterUseCase(routersRepository)

    return registerUseCase
}