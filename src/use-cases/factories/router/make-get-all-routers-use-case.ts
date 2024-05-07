import { PrismaRoutersRepository } from "@/repositories/prisma/prisma-routers-repository"
import { GetAllRoutersUseCase } from "@/use-cases/router/get-all-routers/get-all-routers"

export function makeGetAllRoutersUseCase() {
    const routersRepository = new PrismaRoutersRepository()
    const useCase = new GetAllRoutersUseCase(routersRepository)

    return useCase
}