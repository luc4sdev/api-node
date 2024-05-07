import { PrismaRoutersRepository } from "@/repositories/prisma/prisma-routers-repository"
import { DeleteRouterUseCase } from "@/use-cases/router/delete-router/delete-router"

export function makeDeleteRouterUseCase() {
    const routersRepository = new PrismaRoutersRepository()
    const registerUseCase = new DeleteRouterUseCase(routersRepository)

    return registerUseCase
}