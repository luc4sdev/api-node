import { CreateRouterUseCaseRequest } from "@/use-cases/router/create-router/create-router";
import { DeleteRouterUseCaseRequest } from "@/use-cases/router/delete-router/delete-router";
import { RouterWithClients } from "@/use-cases/router/get-router/get-router";
import { UpdateRouterUseCaseRequest } from "@/use-cases/router/update-router/update-router";
import { Router } from "@prisma/client";

export interface RoutersRepository {
    findMany(): Promise<RouterWithClients[] | null>
    findById(id: string): Promise<RouterWithClients | null>
    create(data: CreateRouterUseCaseRequest): Promise<Router>
    update(data: UpdateRouterUseCaseRequest): Promise<Router>
    delete(data: DeleteRouterUseCaseRequest): Promise<Router>
}