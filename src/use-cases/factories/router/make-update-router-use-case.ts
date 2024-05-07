import { PrismaRoutersRepository } from "@/repositories/prisma/prisma-routers-repository"
import { UpdateRouterUseCase } from "@/use-cases/router/update-router/update-router"

export function makeUpdateRouterUseCase() {
    const routersRepository = new PrismaRoutersRepository()
    const registerUseCase = new UpdateRouterUseCase(routersRepository)

    return registerUseCase
}